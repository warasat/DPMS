import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/Doctor.js";
import appointmentModel from "../models/Appointment.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// Required to handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: "false", message: "Missing Details" });
    }
    //Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: "false", message: "Invalid Email" });
    }
    //Validating strog password
    if (password.length < 8) {
      return res.json({
        success: "false",
        message: "Password should be at least 8 characters",
      });
    }
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: "true", token });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};

//APi for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ sucess: "false", message: "user does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: "true", token });
    } else {
      res.json({ success: "false", message: "Invalid Password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};
//Api to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};
//Api to update user profile data
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //upload Image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    // Validate ObjectId
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(docId)) {
      return res.json({
        success: false,
        message: "Invalid userId or docId format",
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const doctorObjectId = new mongoose.Types.ObjectId(docId);

    // Fetch doctor data
    const docData = await doctorModel
      .findById(doctorObjectId)
      .select("-password");
    if (!docData)
      return res.json({ success: false, message: "Doctor not found" });

    if (!docData.available)
      return res.json({ success: false, message: "Doctor is not available" });

    // Check if slot is already booked
    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot is not available" });
    }

    // Add the slot if it's available
    slots_booked[slotDate] = slots_booked[slotDate] || [];
    slots_booked[slotDate].push(slotTime);

    // Fetch user data
    const userData = await userModel.findById(userObjectId).select("-password");
    if (!userData)
      return res.json({ success: false, message: "User not found" });

    // Prepare and save appointment
    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });

    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.json({ success: false, message: error.message });
  }
};

// Api to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.query; // Get userId from query

    if (!mongoose.isValidObjectId(userId)) {
      return res.json({ success: false, message: "Invalid userId format" });
    }

    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 });

    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.json({ success: false, message: error.message });
  }
};
//Api to cancel  appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    // Verify Appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to make payment of appointment
const createCheckoutSession = async (req, res) => {
  try {
    const { userId, appointment } = req.body;
    // console.log(appointment);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: appointment.docData.name,
            },
            unit_amount: appointment.amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        docName: appointment.docData.name,
        appointmentId: appointment._id,
      },
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });
    res.json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.body;
    if (!session_id) {
      // console.log("❌ No session_id received");
      return res.status(400).json({ error: "Session ID is required" });
    }

    // console.log("🔄 Verifying Payment for Session ID:", session_id);
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const appointmentId = session.metadata?.appointmentId || null;

    // console.log("session: ", session);
    // console.log("appointmentId: ", appointmentId);
    // await appointmentModel.findByIdAndUpdate(
    //   appointmentId,
    //   {
    //     payment: true,
    //   },
    //   { new: true }
    // );

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      // console.log("❌ Appointment not found");
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update payment status
    appointment.payment = true;
    await appointment.save();

    // console.log("databses updated successgully");
    res.json({ message: "Payment verified successfully" });
  } catch (err) {
    console.log(err);
  }
};
const generateReport = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Fetch the appointment and populate both doctor and patient data
    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate("docData") // Populate doctor details
      .populate("userData"); // Populate patient (user) details

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Log populated data to verify prescription
    console.log("Doctor Data:", appointment.docData);
    console.log("Patient Data:", appointment.userData);

    const doc = new PDFDocument();
    const fileName = `report-${appointmentId}.pdf`;
    const filePath = path.join(__dirname, `../reports/${fileName}`);

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 📝 Add doctor and patient data to the PDF
    doc.fontSize(18).text("Appointment Report", { align: "center" });
    doc.moveDown();

    // Patient info
    doc
      .fontSize(14)
      .text(`Patient Name: ${appointment.userData?.name || "N/A"}`);
    doc.text(`Doctor Name: ${appointment.docData.name}`);
    doc.text(`Speciality: ${appointment.docData.speciality}`);
    doc.text(`Date: ${appointment.slotDate}`);
    doc.text(`Time: ${appointment.slotTime}`);
    doc.moveDown();

    // Add the prescription information for the doctor
    const prescription =
      appointment.docData.prescription || "No prescription available";
    doc.fontSize(14).text(`Prescription: ${prescription}`);
    doc.moveDown();

    doc.text("Thank you for using our service.", { align: "left" });

    doc.end();

    stream.on("finish", () => {
      res.json({
        success: true,
        reportUrl: `${process.env.SERVER_URL}/reports/${fileName}`,
      });
    });
  } catch (err) {
    console.error("Report generation error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  createCheckoutSession,
  verifyPayment,
  generateReport,
};
