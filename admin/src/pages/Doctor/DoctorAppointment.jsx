/* eslint-disable no-unused-vars */
// import React from 'react'
// import { CheckCircleIcon, XCircleIcon } from "lucide-react";

// import { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";
// import Modal from "react-modal";

// const DoctorAppointment = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//     fetchIllnessDetails,
//     selectedIllnessDetails,
//     isModalOpen,
//     setIsModalOpen,
//   } = useContext(DoctorContext);
//   const { calculateAge } = useContext(AppContext);
//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dToken]);
//   useEffect(() => {
//     Modal.setAppElement("#root");
//   },[]);
//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-2 text-lg font-medium">All Appointments</p>
//       <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date and Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//           <p>Health Record</p> {/* New column */}
//         </div>

//         {appointments.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b"
//           >
//             <p>{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 src={item.userData?.image || "default-avatar.png"}
//                 alt={item.userData?.name || "Patient"}
//                 className="w-10 h-10 rounded-full"
//               />
//               <p>{item.userData?.name || "Unknown"}</p>
//             </div>
//             <div>
//               <p>{item.payment ? "Online" : "Cash"}</p>
//             </div>
//             <p>{calculateAge(item.userData?.dob)}</p>
//             <p>
//               {item.slotDate} , {item.slotTime}
//             </p>
//             <p>${item.docData?.fees || "N/A"}</p>
//             {item.cancelled ? (
//               <p className="text-red-500 font-semibold text-s">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 font-semibold text-s">Completed</p>
//             ) : (
//               <div className="flex">
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.cancel_icon}
//                   alt=""
//                 />
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.tick_icon}
//                   alt=""
//                 />
//               </div>
//             )}

//             {/* Tick or Cross icon based on appointment status */}
//             {/* {item.status === "approved" ? (
//               <CheckCircleIcon className="text-green-500 w-6 h-6 " />
//             ) : (
//               <XCircleIcon className="text-red-500 w-6 h-6" />
//             )} */}
//             <div>
//               <button
//                  onClick={() => fetchIllnessDetails(item._id)}
//                 className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-md shadow transition duration-200"
//               >
//                 View Health Record
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//        {/* Modal to display illness details */}
//        <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         contentLabel="Illness Details"
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Illness Details</h2>
//         <div>
//           <p><strong>Symptoms:</strong> {selectedIllnessDetails?.symptoms}</p>
//           <p><strong>History:</strong> {selectedIllnessDetails?.history}</p>
//           <p><strong>Medications:</strong> {selectedIllnessDetails?.medications}</p>
//           <p><strong>Description:</strong> {selectedIllnessDetails?.description}</p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(false)}
//           className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//         >
//           Close
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default DoctorAppointment;
import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    fetchIllnessDetails,
    selectedIllnessDetails,
    isModalOpen,
    setIsModalOpen,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleViewHealthRecord = (appointmentId) => {
    fetchIllnessDetails(appointmentId);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWritePrescription = (appointmentId) => {
    navigate(`/doctor-appointments/${appointmentId}`);
  };

  const filteredAppointments = appointments.filter((item) =>
    item.userData?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <p className="text-lg font-medium">All Appointments</p>
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by patient name"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
        </div>
      </div>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Health Record</p>
          <p>Prescription</p>
        </div>

        {filteredAppointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b"
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData?.image || "default-avatar.png"}
                alt={item.userData?.name || "Patient"}
                className="w-10 h-10 rounded-full"
              />
              <p>{item.userData?.name || "Unknown"}</p>
            </div>
            <div>
              <p>{item.payment ? "Online" : "Cash"}</p>
            </div>
            <p>{calculateAge(item.userData?.dob)}</p>
            <p>
              {item.slotDate} , {item.slotTime}
            </p>
            <p>${item.docData?.fees || "N/A"}</p>
            {item.cancelled ? (
              <p className="text-red-500 font-semibold text-s">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 font-semibold text-s">Completed</p>
            ) : (
              <div className="flex">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}

            <div>
              <button
                onClick={() => handleViewHealthRecord(item._id)}
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded-md shadow transition duration-200"
              >
                View Health Record
              </button>
            </div>
            <div>
              <button
                onClick={() => handleWritePrescription(item._id)}
                className="px-3 py-1 bg-pink-500 hover:bg-pink-600 text-white text-xs rounded-md shadow transition duration-200"
              >
                Write Prescription
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Illness Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Illness Details"
        className="modal-card"
        overlayClassName="overlay"
      >
        <div className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="p-6 bg-white rounded-lg shadow-lg w-[50vw] max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-center mb-4">
              Health Record
            </h2>
            <div>
              <p>
                <strong>Symptoms:</strong> {selectedIllnessDetails?.symptoms}
              </p>
              <p>
                <strong>History:</strong> {selectedIllnessDetails?.history}
              </p>
              <p>
                <strong>Medications:</strong>{" "}
                {selectedIllnessDetails?.medications}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedIllnessDetails?.description}
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorAppointment;
