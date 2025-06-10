import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  createCheckoutSession,
  verifyPayment,
  saveIllnessDetails,
  getPrescriptionDetails,
  generateReport,
  submitContactForm,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/create-checkout-session", authUser, createCheckoutSession);
userRouter.post("/verify-payment", authUser, verifyPayment);
userRouter.post("/save-illness-details",authUser, saveIllnessDetails);
userRouter.get("/get-prescription/:appointmentId",authUser, getPrescriptionDetails);
userRouter.post("/contact-form", submitContactForm);



// Generate report
userRouter.post("/generate-report", authUser, generateReport);

export default userRouter;
