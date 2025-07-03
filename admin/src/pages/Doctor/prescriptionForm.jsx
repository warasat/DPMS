/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const PrescriptionDetails = () => {
  const { appointmentId } = useParams();
  const { backendUrl, dToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const [prescriptionDetails, setPrescriptionDetails] = useState({
    medicine1: "",
    medicine2: "",
    medicine3: "",
    description: "",
  });

  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
  });

  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    age: "",
  });

  const isAlpha = (value) => /^[A-Za-z\s]*$/.test(value);
  const isPositiveInt = (value) => /^\d+$/.test(value) && Number(value) > 0;
  const isAlphaNumeric = (value) => /^[A-Za-z0-9\s.,-]*$/.test(value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["medicine1", "medicine2", "medicine3", "description"].includes(name)) {
      if (!isAlphaNumeric(value)) return;
    }
    setPrescriptionDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !isAlpha(value)) return;
    if (name === "age" && value && !isPositiveInt(value)) return;
    setPatientDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !isAlpha(value)) return;
    if (name === "age" && value && !isPositiveInt(value)) return;
    setDoctorDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/save-prescription-details`,
        {
          appointmentId,
          patientDetails: {
            ...patientDetails,
            age: Number(patientDetails.age),
          },
          doctorDetails: {
            ...doctorDetails,
            age: Number(doctorDetails.age),
          },
          prescriptionDetails,
        },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success("Prescription details saved successfully!");
        navigate("/doctor-appointments");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving prescription details:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-red-500"
        title="Close"
      >
        ×
      </button>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Prescription Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 overflow-y-auto max-h-[70vh]"
      >
        <div>
          <label className="block text-lg font-medium">Appointment ID</label>
          <input
            type="text"
            name="appointmentId"
            value={appointmentId}
            className="w-full p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium">Patient Name</label>
              <input
                type="text"
                name="name"
                value={patientDetails.name}
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Patient Name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={patientDetails.age}
                min="1"
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Patient Age"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Doctor Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium">Doctor Name</label>
              <input
                type="text"
                name="name"
                value={doctorDetails.name}
                onChange={handleDoctorChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Doctor Name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={doctorDetails.age}
                min="1"
                onChange={handleDoctorChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Doctor Age"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Medicine Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium">Medicine 1</label>
              <input
                type="text"
                name="medicine1"
                value={prescriptionDetails.medicine1}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Medicine Name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Medicine 2</label>
              <input
                type="text"
                name="medicine2"
                value={prescriptionDetails.medicine2}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Medicine Name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Medicine 3</label>
              <input
                type="text"
                name="medicine3"
                value={prescriptionDetails.medicine3}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Medicine Name"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium">
            Prescription Description
          </label>
          <textarea
            name="description"
            value={prescriptionDetails.description}
            onChange={handleChange}
            className="w-full p-2 h-32 border border-gray-300 rounded-md"
            placeholder="Enter prescription notes here..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Submit Prescription
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionDetails;
