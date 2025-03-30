/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

// eslint-disable-next-line no-unused-vars
const stripePromise = loadStripe(
  "pk_test_51QmeTLKtY3yUbKVRDEl13v4EUHofzECfnFGUMkSEFnwoUKGwrsAfBsMHKbIIfR28zS9ePy9jLo4GGQJ5WhUWivET00Lk0EYxSQ"
);

const MyAppointments = () => {
  const { backendUrl, token, userData, getDoctorsData } =
    useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.log(data.appointments);
      } else {
        setAppointments([]);
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
      console.log(appointment);
      // eslint-disable-next-line no-unused-vars
      const stripe = await stripePromise;

      // eslint-disable-next-line no-unused-vars
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments available</p>
        ) : (
          appointments.map((item) => (
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
                {!item.cancelled && !item.payment &&  !item.isCompleted &&(
                  <button
                    onClick={() => handleEnroll(item)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted &&(
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.payment && !item.cancelled && !item.isCompleted &&(
                  <button className="text-sm text-green-500 text-center sm:min-w-48 py-2 border-green-500">
                    ✅ Paid
                  </button>
                )}

                {item.cancelled && !item.isCompleted &&(
                  <button className="text-sm text-red-500 text-center sm:min-w-48 py-2 border-red-500">
                    Appointment Cancelled
                  </button>
                )}
                {
                  item.isCompleted && <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500 ">Completed</button>
                }
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
