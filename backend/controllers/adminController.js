// // API FOR ADDING DOCTORS
// import validator from "validator"
// import bcrypt from "bcrypt"
// import {v2 as cloudinary} from "cloudinary"
// import doctorModel from "../models/Doctor"

// const addDoctor = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       image,
//       speciality,
//       degree,
//       experience,
//       about,
//       fees,
//       address,

//     } = req.body;
//     const imageFile = req.file;
//     // console.log(
//     //   {
//     //     name,
//     //     email,
//     //     password,
//     //     image,
//     //     speciality,
//     //     degree,
//     //     experience,
//     //     about,
//     //     available,
//     //     fees,
//     //     address,
//     //     date,
//     //     slots_booked,
//     //   },
//     //   imageFile
//     // );

//     // checking for all data to add doctors
//     if (!name || !email || !password || !image || !speciality || !degree || !experience || !about || !fees || !address){
//       return res.status(400).json({ success: "false",message: "Please fill all the fields" });
//     }
//    // validating email fromat
//    if(!validator.isEmail(email)){
//     res.json({success: "false", message: "please enter a valid email "})
//    }
//    // strong password
//    if(password.length < 8 ){
//     return res.status(400).json({ success: "false",message: "Please enter a strong password"})

//    //hashing doctor password
//    const salt = await bcrypt.genSalt(10)
//    const hashedPassword = await bcrypt.hash(password, salt);

//    // upload image to cloudinary
//    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
//    const imageUrl  = imageUpload.secure_url

//    const doctorData = {
//     name,
//     email,
//     hashedPassword,
//     speciality,
//     degree,
//     experience,
//     about,
//     fees,
//     address:JSON.parse(address),
//     date:Date.now(),

//    }

//    const newDoctor = new doctorModel (doctorData)
//    await newDoctor.save()
//    res.json({success: "true", message: "Doctor added successfully"})

//   }} catch (error) {
//     console.error(error);
//     res.json({success:"false" , message: error.message})
//   }
// };
// export { addDoctor };

import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/Doctor.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // console.log("Request body:", req.body);

    // Checking for all required fields
    if (
      !name ||
      !email ||
      !password ||
      !imageFile ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: "false", message: "Please fill all the fields" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: "false",
        message: "Please enter a valid email",
      });
    }

    // Checking for a strong password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: "false", message: "Please enter a strong password" });
    }

    // Hashing the doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: "false", message: "Please upload an image" });
    }
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Handle address - ensure it's either an object or a valid stringified JSON
    let parsedAddress = address;

    // If the address is passed as a stringified JSON, we parse it
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address); // Parse the stringified address
      } catch (err) {
        return res
          .status(400)
          .json({ success: "false", message: "Invalid address format" });
      }
    }

    // Creating doctor data object
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress, // Use parsed address
      date: Date.now(),
    };

    // Creating new doctor record
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({ success: "true", message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: "false", message: error.message });
  }
};

//Api for Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: "true", token });
    } else {
      res.json({ success: "false", message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};
//API to get all the doctors list from the admin panel
const allDcotors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", message: error.message });
  }
};

export { addDoctor, loginAdmin, allDcotors };
