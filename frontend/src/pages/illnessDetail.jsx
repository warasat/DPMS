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

  const { appointmentId } = useParams(); // Get the appointment ID from the URL
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIllnessDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
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

