/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon from react-icons

const stripePromise = loadStripe(
  "pk_test_51QmeTLKtY3yUbKVRDEl13v4EUHofzECfnFGUMkSEFnwoUKGwrsAfBsMHKbIIfR28zS9ePy9jLo4GGQJ5WhUWivET00Lk0EYxSQ"
);

const MyAppointments = () => {
  const { backendUrl, token, userData, getDoctorsData } =
    useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered appointments
  const navigate = useNavigate();
  const months = [
    "Jan",
    "",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  useEffect(() => {
    if (token && userData?._id) {
      getUserAppointments();
    }
  }, [token, userData]);

  useEffect(() => {
    // Filter appointments based on the search term
    if (searchTerm) {
      const filtered = appointments.filter(
        (item) =>
          item.docData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.docData.speciality
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments);
    }
  }, [searchTerm, appointments]);

  const getUserAppointments = async () => {
    try {
      if (!token) {
        toast.error("Token is missing. Please log in again.");
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments?userId=${userData._id}`,
        { headers: { token } }
      );

      if (data.success && Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
        setFilteredAppointments(data.appointments); // Set the filtered appointments initially
      } else {
        setAppointments([]);
        setFilteredAppointments([]);
        toast.error("No appointments found.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const handleEnroll = async (appointment) => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post(
        `${backendUrl}/api/user/create-checkout-session`,
        { userId: userData._id, appointment },
        { headers: { token } }
      );
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("❌ No URL received from backend!");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.message);
    }
  };

  const handleIllnessDetails = (appointmentId) => {
    navigate(`/appointment/illness-details/${appointmentId}`);
  };

  const fetchPrescriptionData = async (appointmentId) => {
    navigate(`/appointment/get-prescription/${appointmentId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleGenerateReport = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/generate-report`,
        { appointmentId },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Report generated successfully");

        // Download the PDF
        const link = document.createElement("a");
        link.href = response.data.reportUrl;
        link.download = `Appointment-Report-${appointmentId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("Failed to generate report");
      }
    } catch (error) {
      toast.error("Error generating report");
      console.error("Generate report error:", error);
    }
  };

  return (
    <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Search Row */}
      <div
  className="flex flex-col sm:flex-row justify-between items-center mt-12 mb-6 gap-4 border-b border-gray-300 pb-3 -mx-4 sm:-mx-6 lg:-mx-8"
>
        <p className="text-lg sm:text-xl font-semibold text-zinc-700 px-6">
          My Appointments
        </p>
        
        <div className="relative w-full sm:w-1/4 ml-auto ">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400  " />
        </div>
      </div>

      <div>
        {filteredAppointments.length === 0 ? (
          <p>No appointments available</p>
        ) : (
          filteredAppointments.map((item) => (
            <div
              className="grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ml-5"
              key={item._id}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>

                {/* Doctor Email */}
                <p className="text-sm text-zinc-700">
                  <span className="font-medium text-neutral-700">Email:</span>{" "}
                  {item.docData.email}
                </p>

                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => handleEnroll(item)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.payment && !item.cancelled && !item.isCompleted && (
                  <>
                    {/* Flex container with minimal gap */}
                    {/* Paid button */}
                    <button className="text-sm text-green-500 text-center sm:min-w-48 py-2 mr-2 border-green-500">
                      ✅ Paid
                    </button>
                    {/* Call Now button */}
                    <button
                      onClick={() => {
                        window.open(
                          "https://meet.google.com/landing",
                          "_blank"
                        );
                      }}
                      className="mr-2 text-sm text-yellow-500 border-yellow-500 py-2 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-md"
                    >
                      Call Now
                    </button>

                    {/* Generate Report button */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleGenerateReport(item._id)}
                        className="text-sm  text-pink-600  py-3 hover:bg-pink-600  hover:text-white  px-10 mt-2 border rounded-md"
                      >
                        Generate Report
                      </button>
                    </div>

                    {/* Fill Health Record button */}
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => handleIllnessDetails(item._id)}
                        className="text-sm text-yellow-500 text-center py-3 px-10 border hover:bg-yellow-500 hover:text-white transition-all duration-300 rounded-md"
                      >
                        Fill Health Record
                      </button>
                    </div>
                  </>
                )}

                {item.cancelled && !item.isCompleted && (
                  <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border-red-500">
                    Appointment Cancelled
                  </button>
                )}
                {item.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 ">
                    Completed
                  </button>
                )}

                {/* View Prescription button */}
                {!item.cancelled && item.isCompleted && item.payment && (
                  <button
                    onClick={() => fetchPrescriptionData(item._id)} // Trigger fetch for prescription
                    className="rounded-md text-sm text-blue-500 text-center sm:min-w-48 py-2 border hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    View Prescription
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
