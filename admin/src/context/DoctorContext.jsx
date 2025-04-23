/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  
  // State to manage the illness details
  const [selectedIllnessDetails, setSelectedIllnessDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments", {
        headers: { dToken },
      });
      if (data.success) {
        const reversedAppointments = data.appointments.reverse();
        setAppointments(reversedAppointments);
        console.log(reversedAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch illness details by appointment ID
  const fetchIllnessDetails = async (appointmentId) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointments/${appointmentId}/illness-details`,
        { headers: { dToken } }  // Ensure the token header is correct here
      );
      console.log("Backend response data:", data); 
      if (data.success  && data.appointment && data.appointment.illnessDetails) {
        setSelectedIllnessDetails(data.appointment.illnessDetails);  // Assuming illnessDetails is in appointment object
        console.log("Illness Details set:", data.appointment.illnessDetails);
        setIsModalOpen(true);  // Open modal after data is fetched
        // console.log("Modal Opened: ", isModalOpen);
        // console.log("Illness Details: ", selectedIllnessDetails);
      } else {
        toast.error(data.message || "Failed to fetch illness details");
      }
    } catch (error) {
      console.error("Error fetching illness details:", error);
      toast.error("An error occurred while fetching illness details.");
    }
  };

  // Mark appointment as completed
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Dashboard Data Fetch
  const [dashData, setDashData] = useState(false);
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Profile Data Fetch
  const [profileData, setProfileData] = useState(false);
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dToken },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
    // Adding illness details and modal state to context
    selectedIllnessDetails,
    isModalOpen,
    fetchIllnessDetails,
    setIsModalOpen,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

