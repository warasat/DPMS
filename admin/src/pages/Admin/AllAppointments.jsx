/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { FaSearch } from "react-icons/fa";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Filter appointments by patient or doctor name
  const filteredAppointments = appointments.filter(
    (item) =>
      item.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Heading and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <p className="font-medium text-lg text-gray-800">All Appointments</p>
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by patient or doctor name"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 border-b bg-gray-100">
          <p className="text-gray-600 font-semibold">#</p>
          <p className="text-gray-600 font-semibold">Patient</p>
          <p className="text-gray-600 font-semibold">Age</p>
          <p className="text-gray-600 font-semibold">Date & Time</p>
          <p className="text-gray-600 font-semibold">Doctor</p>
          <p className="text-gray-600 font-semibold">Fees</p>
          <p className="text-gray-600 font-semibold">Action</p>
        </div>

        {filteredAppointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-200"
            key={index}
          >
            {/* Index # */}
            <p className="max-sm:hidden text-gray-700 font-medium">
              {index + 1}
            </p>

            {/* Patient Info */}
            <div className="flex items-center gap-3 sm:items-start">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData.image}
                alt="Patient Avatar"
              />
              <p className="text-gray-700 font-medium">{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="text-gray-600 py-2">
              {calculateAge(item.userData.dob)}
            </p>

            {/* Date & Time */}
            <p className="text-gray-600 py-2">
              {slotDateFormat(item.slotDate)} , {item.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 sm:items-start">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.docData.image}
                alt="Doctor Avatar"
              />
              <p className="text-gray-700 font-medium">{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-gray-600 py-2">
              {currency}
              {item.amount}
            </p>

            {/* Action */}
            <div className="flex items-center justify-center gap-2">
              {item.cancelled ? (
                <p className="text-red-500 font-medium text-xs">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-medium text-xs">Completed</p>
              ) : (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-red-600 transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
