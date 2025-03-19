import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/Doctor.js";
import appointmentModel from "../models/Appointment.js";

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
export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
