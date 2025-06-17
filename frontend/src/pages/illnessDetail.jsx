/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const IllnessDetails = () => {
  const [illnessDetails, setIllnessDetails] = useState({
    symptoms: "",
    history: "",
    medications: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    symptoms: "",
    history: "",
    medications: "",
    description: "",
  });

  const { appointmentId } = useParams(); // Get the appointment ID from the URL
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear previous error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "symptoms" || name === "history") {
      // Allow only characters and spaces for symptoms and history
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must only contain letters and spaces.`,
        }));
      }
    } else if (name === "medications" || name === "description") {
      // Medications and description can start with a letter and allow numbers
      if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must start with a letter and can contain numbers.`,
        }));
      }
    }

    setIllnessDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let formErrors = {};
    let isValid = true;

    // Symptoms and History should only contain letters and spaces
    if (!/^[A-Za-z\s]*$/.test(illnessDetails.symptoms)) {
      formErrors.symptoms = "Symptoms should only contain letters and spaces.";
      isValid = false;
    }

    if (!/^[A-Za-z\s]*$/.test(illnessDetails.history)) {
      formErrors.history = "History should only contain letters and spaces.";
      isValid = false;
    }

    // Medications and Description should start with a letter and allow numbers and spaces
    if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(illnessDetails.medications)) {
      formErrors.medications = "Medications should start with a letter and can contain numbers.";
      isValid = false;
    }

    if (!/^[A-Za-z][A-Za-z0-9\s]*$/.test(illnessDetails.description)) {
      formErrors.description = "Description should start with a letter and can contain numbers.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submission
    if (!validateInputs()) {
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/save-illness-details", 
        { appointmentId, ...illnessDetails }, // Send all illness details
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success("Illness details saved successfully!");
        navigate("/my-appointments"); // Redirect to the appointments page after success
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving illness details:", error);
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const closePage = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="relative max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        onClick={closePage}
        className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Enter Your Illness Details</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="input-group">
          <label className="block text-2xl font-semibold text-gray-800">Symptoms</label>
          <textarea
            name="symptoms"
            value={illnessDetails.symptoms}
            onChange={handleChange}
            className="w-full p-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter symptoms here..."
          />
          {errors.symptoms && <p className="text-red-500 text-sm">{errors.symptoms}</p>}
        </div>
        <div className="input-group">
          <label className="block text-2xl font-semibold text-gray-800">History of Symptoms</label>
          <textarea
            name="history"
            value={illnessDetails.history}
            onChange={handleChange}
            className="w-full p-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter history of symptoms..."
          />
          {errors.history && <p className="text-red-500 text-sm">{errors.history}</p>}
        </div>
        <div className="input-group">
          <label className="block text-2xl font-semibold text-gray-800">Medications</label>
          <textarea
            name="medications"
            value={illnessDetails.medications}
            onChange={handleChange}
            className="w-full p-4 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter medications here..."
          />
          {errors.medications && <p className="text-red-500 text-sm">{errors.medications}</p>}
        </div>
        <div className="input-group">
          <label className="block text-2xl font-semibold text-gray-800">Condition Description</label>
          <textarea
            name="description"
            value={illnessDetails.description}
            onChange={handleChange}
            className="w-full p-4 h-48 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your health condition in detail..."
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>
        <button
          type="submit"
          className="w-auto py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default IllnessDetails;
