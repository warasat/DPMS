// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import { createContext } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// export const AdminContext = createContext();
// const AdminContextProvider = (props) => {
//   const [aToken, setAToken] = useState(
//     localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
//   );
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [doctors, setDoctors] = useState([]);
//   const getAllDoctors = async () => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/all-doctors",
//         {},
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         setDoctors(data.doctors);
//         console.log(data.doctors);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   const changeAvailablity = async (docId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/admin/change-availability",
//         { docId },
//         { headers: { aToken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         getAllDoctors();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const [appointments , setAppointments] = useState([]);
//   const getAllAppointments = async () => {
//     try {
//       const {data} = await axios.get(backendUrl+ "/api/admin/appointments" , {headers : {aToken}})
//       if(data.success){
//         setAppointments(data.appointments);
//         console.log(data.appointments)
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
      
//     }
//   }

//   const cancelAppointment = async (appointmentId) => {
    
//     try {
//       const {data} = await axios.post(backendUrl + "/api/admin/cancel-appointment" , {appointmentId} , {headers:{aToken}})
//       if(data.success){
//         toast.success(data.message)
//         getAllAppointments()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }

//   const [dashData , setDashData] = useState(false)
//   const getDashData = async () => {
//     try {
//       const {data} = await axios.get(backendUrl + '/api/admin/dashboard' , {headers:{aToken}})
//       if(data.success){
//         setDashData(data.dashData)
//         console.log(data.dashData)
//       } else {
//         toast.error(data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message);
//     }
//   }

//   const value = {
//     aToken,
//     setAToken,
//     backendUrl,
//     doctors,
//     getAllDoctors,
//     changeAvailablity,
//     appointments,
//     setAppointments,
//     getAllAppointments,
//     cancelAppointment,
//     dashData,
//     getDashData
//   };
//   return (
//     <AdminContext.Provider value={value}>
//       {props.children}
//     </AdminContext.Provider>
//   );
// };
// export default AdminContextProvider;
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State for doctors
  const [doctors, setDoctors] = useState([]);

  // Function to get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change doctor availability
  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // State for appointments
  const [appointments, setAppointments] = useState([]);

  // Function to get all appointments
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: { aToken },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to cancel an appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Dashboard data state
  const [dashData, setDashData] = useState(false);

  // Function to get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // State for contact forms (feedbacks)
  const [contactForms, setContactForms] = useState([]);

  // Function to get all contact forms (feedbacks)
  const getAllContactForms = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/contact-forms", {
        headers: { aToken },
      });
      if (data.success) {
         console.log("Contact Forms Data:", data.contactForms);  // Log the data
        setContactForms(data.contactForms);  // Set the contactForms state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Providing all functions and states to the context
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailablity,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    contactForms,
    getAllContactForms,  // Include the function to get contact forms
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
