/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-empty */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react'
// //import { doctors } from '../assets/assets'
// import { useContext } from 'react'
// import {AppContext} from '../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyAppointments = () => {

// const {backendUrl , token} = useContext(AppContext)
// const [appointments, setAppointments] = useState([])
// // const getUserAppointments = async () => {
// // try {
// //   const {data} = await axios.get(backendUrl + '/api/user/appointments' , {headers : {token}})
// //   if(data.success){
// //     setAppointments(data.appointments.reverse())
// //     console.log(data.appointments)
// const getUserAppointments = async () => {
//   try {
//     const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
//     console.log('Response Data:', data);
//     // Check if data.success is true and if appointments is an array
//     if (data.success && Array.isArray(data.appointments)) {
//       // Reverse the appointments array
//       setAppointments(data.appointments.reverse());
//       console.log(data.appointments);
//   }
// } catch (error) {
//   console.log(error)
//   toast.error(error.message)
// }
// }

// useEffect(()=>{
//   if(token){
//     getUserAppointments()
//   }

// },[token])

//   return (
//     <div>
//       <p className='pb-3 mt-12 font-medium text-zinc-700  border-b  '>My Appointments</p>
//       <div>
//         {
//           appointments.map((item, index) => (
//             <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ml-5' key={index}>
//               <div>
//                 <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
//               </div>
//               <div className='flex-1 text-sm text-zinc-600'>
//                 <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
//                 <p>{item.docData.speciality}</p>
//                 <p className='text-zinc-700 font-medium mt-1'>Adress:</p>
//                 <p className='text-xs'>{item.docData.address.line1}</p>
//                 <p className='text-xs'>{item.docData.address.line2}</p>
//                 <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{item.slotDate} | {item.slotTime}</p>
//               </div>
//               <div></div>
//               <div className='flex flex-col justify-end gap-2 mr-10'> 
//                 <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>
//                 <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appoitment</button>
//               </div>
//             </div>

//            ) )}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state

  const getUserAppointments = async () => {
    try {
      // Make sure token exists before sending request
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        return;
      }

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
      console.log('Response Data:', data);

      if (data.success === "true" && Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
      } else {
        toast.error('No appointments found.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Set loading to false when the API call is complete
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]); // Only re-run when token changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointments.length === 0 ? (
          <p>No appointments available</p> // Show message if there are no appointments
        ) : (
          appointments.map((item, index) => (
            <div
              className="grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b ml-5"
              key={item._id} // Use _id instead of index for key
              
            >
              
              <div>
                <img className="w-32 bg-indigo-50" src={item.docData.image} alt={item.docData.name} />
              </div>
              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Address:</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="text-xs mt-1">
                  <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {item.slotDate} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className="flex flex-col justify-end gap-2 mr-10">
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
