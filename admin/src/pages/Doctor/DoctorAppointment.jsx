/* eslint-disable no-unused-vars */
// import React from 'react'
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken]);
  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-2 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[50vh]">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Patient Age</p>
          <p>Appintment Data and Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b"
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
              {item.slotDate} | {item.slotTime}
            </p>
            <p>${item.docData?.fees || "N/A"}</p>

            {/* Tick or Cross icon based on appointment status */}
            {item.status === "approved" ? (
              <CheckCircleIcon className="text-green-500 w-6 h-6" />
            ) : (
              <XCircleIcon className="text-red-500 w-6 h-6" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
