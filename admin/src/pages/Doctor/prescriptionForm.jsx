// /* eslint-disable no-unused-vars */
// import React, { useState, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom"; 
// import axios from "axios";
// import { toast } from "react-toastify";
// import { DoctorContext } from "../../context/DoctorContext";

// const PrescriptionDetails = () => {
//   const { appointmentId } = useParams(); // Get the appointment ID from the URL
//   const { backendUrl, dToken } = useContext(DoctorContext);  // Fetch illness details from context

//   // State for Prescription Details
//   const [prescriptionDetails, setPrescriptionDetails] = useState({
//     medicine1: "",
//     medicine2: "",
//     medicine3: "",
//     description: "",
//   });

//   // State for Patient Information
//   const [patientDetails, setPatientDetails] = useState({
//     name: "",  // Patient Name
//     age: "",   // Patient Age
//   });

//   // State for Doctor Information
//   const [doctorDetails, setDoctorDetails] = useState({
//     name: "",  // Doctor Name
//     age: "",   // Doctor Age
//   });

//   const navigate = useNavigate();

//   // Handle input changes for prescription details
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPrescriptionDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle input changes for patient details
//   const handlePatientChange = (e) => {
//     const { name, value } = e.target;
//     setPatientDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle input changes for doctor details
//   const handleDoctorChange = (e) => {
//     const { name, value } = e.target;
//     setDoctorDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submit to save prescription details
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         `${backendUrl}/api/doctor/save-prescription-details`,
//         { appointmentId, patientDetails, doctorDetails, prescriptionDetails },
//         { headers: { dToken } }
//       );
  
//       if (data.success) {
//         toast.success("Prescription details saved successfully!");
//         navigate("/doctor-appointments"); // Redirect to the appointments page after success
//       } else {
//         toast.error(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error saving prescription details:", error);
//       toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//       <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Prescription Details</h2>

//       {/* Scrollable Form */}
//       <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto max-h-[70vh]">
        
//         {/* Patient Information */}
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
//           <div className="grid grid-cols-2 gap-6"> {/* Two-column layout for patient info */}
//             <div>
//               <label className="block text-lg font-medium">Patient Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={patientDetails.name}
//                 onChange={handlePatientChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Patient Name"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={patientDetails.age}
//                 onChange={handlePatientChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Patient Age"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Doctor Information */}
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Doctor Information</h3>
//           <div className="grid grid-cols-2 gap-6"> {/* Two-column layout for doctor info */}
//             <div>
//               <label className="block text-lg font-medium">Doctor Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={doctorDetails.name}
//                 onChange={handleDoctorChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Doctor Name"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 value={doctorDetails.age}
//                 onChange={handleDoctorChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Doctor Age"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Medicine Input Fields */}
//         <div>
//           <h3 className="text-xl font-semibold mb-2">Medicine Details</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-lg font-medium">Medicine 1</label>
//               <input
//                 type="text"
//                 name="medicine1"
//                 value={prescriptionDetails.medicine1}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Medicine Name"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium">Medicine 2</label>
//               <input
//                 type="text"
//                 name="medicine2"
//                 value={prescriptionDetails.medicine2}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Medicine Name"
//               />
//             </div>
//             <div>
//               <label className="block text-lg font-medium">Medicine 3</label>
//               <input
//                 type="text"
//                 name="medicine3"
//                 value={prescriptionDetails.medicine3}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 placeholder="Enter Medicine Name"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Prescription Description */}
//         <div>
//           <label className="block text-lg font-medium">Prescription Description</label>
//           <textarea
//             name="description"
//             value={prescriptionDetails.description}
//             onChange={handleChange}
//             className="w-full p-2 h-32 border border-gray-300 rounded-md"
//             placeholder="Enter prescription notes here..."
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 w-full"
//           >
//             Submit Prescription
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PrescriptionDetails;

/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const PrescriptionDetails = () => {
  const { appointmentId } = useParams(); // Get the appointment ID from the URL
  const { backendUrl, dToken } = useContext(DoctorContext);  // Fetch illness details from context

  // State for Prescription Details
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    medicine1: "",
    medicine2: "",
    medicine3: "",
    description: "",
  });

  // State for Patient Information
  const [patientDetails, setPatientDetails] = useState({
    name: "",  // Patient Name
    age: "",   // Patient Age
  });

  // State for Doctor Information
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",  // Doctor Name
    age: "",   // Doctor Age
  });

  

  const navigate = useNavigate();

  // Handle input changes for prescription details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for patient details
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for doctor details
  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit to save prescription details
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/save-prescription-details`,
        {
          appointmentId,
          patientDetails: {
            name: patientDetails.name,
            age: patientDetails.age
          },
          doctorDetails: {
            name: doctorDetails.name,
            age: doctorDetails.age
          },
          prescriptionDetails: {
            medicine1: prescriptionDetails.medicine1,
            medicine2: prescriptionDetails.medicine2,
            medicine3: prescriptionDetails.medicine3,
            description: prescriptionDetails.description,
          } 
        },
        { headers: { dToken } }
      );
  
      if (data.success) {
        toast.success("Prescription details saved successfully!");
        navigate("/doctor-appointments"); // Redirect after success
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving prescription details:", error);
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Prescription Details</h2>

      {/* Scrollable Form */}
      <form onSubmit={handleSubmit} className="space-y-8 overflow-y-auto max-h-[70vh]">
        
        {/* Appointment ID (auto-filled) */}
        <div>
          <label className="block text-lg font-medium">Appointment ID</label>
          <input
            type="text"
            name="appointmentId"
            value={appointmentId} // Automatically fill this field with URL appointmentId
            className="w-full p-2 border border-gray-300 rounded-md"
            readOnly
          />
        </div>

        {/* Patient Information */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
          <div className="grid grid-cols-2 gap-6"> {/* Two-column layout for patient info */}
            <div>
              <label className="block text-lg font-medium">Patient Name</label>
              <input
                type="text"
                name="name"
                value={patientDetails.name}
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Patient Name"
                  // Make it read-only, since it's fetched from the database
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={patientDetails.age}
                onChange={handlePatientChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Patient Age"
              />
            </div>
          </div>
        </div>

        {/* Doctor Information */}
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
                  // Make it read-only, since it's fetched from the database
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={doctorDetails.age}
                onChange={handleDoctorChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Doctor Age"
              />
            </div>
          </div>
        </div>

        {/* Medicine Input Fields */}
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

        {/* Prescription Description */}
        <div>
          <label className="block text-lg font-medium">Prescription Description</label>
          <textarea
            name="description"
            value={prescriptionDetails.description}
            onChange={handleChange}
            className="w-full p-2 h-32 border border-gray-300 rounded-md"
            placeholder="Enter prescription notes here..."
          />
        </div>

        {/* Submit Button */}
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

