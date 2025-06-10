// /* eslint-disable no-unused-vars */
// import React from 'react'
// import { useContext } from 'react'
// import { useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { assets } from '../../assets/assets'
// import { AppContext } from '../../context/AppContext'




// const Dashboard = () => {
//   const {aToken , getDashData , cancelAppointment , dashData} = useContext(AdminContext)
//   const {slotDateFormat} = useContext(AppContext)
// useEffect(()=>{
//   if(aToken){
//     getDashData()
//   }

// },[aToken])
//   return dashData &&(
//     <div className='m-5'>
//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.doctor_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
//             <p className='text-gray-400'>Doctors</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointment_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>

//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>{dashData.patient}</p>
//             <p className='text-gray-400'>Patients</p>
//           </div>
//         </div>

//       </div>

//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border '>
//          <img src={assets.list_icon} alt="" />
//          <p className='font-semibold'>Latest Booking</p>
//         </div>
//         <div className='pt-4 border border-t-0'>
//           {
//             dashData.latestAppointments.map((item , index)=>(
//               <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//                <img className='rounded-full w-10' src={item.docData.image} alt="" />
//                <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.docData.name}</p>
//                 <p className='text-gray-800'>{slotDateFormat(item.slotDate)}</p>
//                </div>
               
//               {/* {item.cancelled ? <p className='text-red-500 font-medium text-xs'>Cancelled</p> : <button onClick={()=>cancelAppointment(item._id)} className='bg-red-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-red-600 transition-all duration-200'>
//                 Cancel
//               </button> } */}
//               <div className="flex items-center justify-center gap-2">
//               {item.cancelled ? (
//                 <p className="text-red-500 font-medium text-xs">Cancelled</p>
//               ) : item.isCompleted ? (
//                 <p className="text-green-500 font-medium text-xs">Completed</p>
//               ) : (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className="bg-red-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-red-600 transition-all duration-200"
//                 >
//                   Cancel
//                 </button>
//               )}
//               {/* <button className='bg-blue-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-blue-600 transition-all duration-200'>
//                 View
//               </button> */}
//               {/* <button className='bg-red-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-red-600 transition-all duration-200'>
//                 Cancel
//               </button> */}
//             </div>
              
//               </div>
//           ))}
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Dashboard


/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  if (!dashData) return null;

  // Use aggregated counts from dashData
  const completedCount = dashData.totalCompletedAppointments || 0;
  const cancelledCount = dashData.totalCancelledAppointments || 0;
  const pendingCount = Math.max(0, dashData.appointments - completedCount - cancelledCount);
  const totalCount = dashData.appointments || completedCount + cancelledCount;

  // Doughnut chart data: Total appointments, patients, doctors
  const doughnutData = {
    labels: ["Appointments", "Patients", "Doctors"],
    datasets: [
      {
        label: "Count",
        data: [dashData.appointments, dashData.patient, dashData.doctors],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)", // blue
          "rgba(255, 99, 132, 0.7)", // red
          "rgba(255, 206, 86, 0.7)", // yellow
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Appointments, Patients & Doctors Overview",
      },
    },
  };

  // Bar chart data: Cancelled vs Completed appointments (overall)
  const barData = {
  labels: ["Completed", "Cancelled", "Pending"],
  datasets: [
    {
      label: "Appointments",
      data: [completedCount, cancelledCount, pendingCount],
      backgroundColor: [
        "rgba(75, 192, 192, 0.7)", // green for completed
        "rgba(255, 99, 132, 0.7)", // red for cancelled
        "rgba(255, 206, 86, 0.7)", // yellow for pending
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

  const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: `Appointment Status (Total: ${totalCount})`,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0, // whole numbers only
      },
    },
  },
};

  return (
    <div className="m-5">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img
            className="w-14"
            src={assets.appointment_icon}
            alt="Appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashData.patient}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Booking and Charts Section */}
      <div className="flex gap-6 mt-10 h-[70vh]">
        {/* Latest Booking - fixed width */}
        <div className="w-[450px] bg-white rounded shadow overflow-y-auto border">
          <div className="flex items-center gap-2.5 px-4 py-4 rounded-t border-b bg-gray-50">
            <img src={assets.list_icon} alt="List Icon" />
            <p className="font-semibold">Latest Booking</p>
          </div>
          <div className="pt-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt={`${item.docData.name} Avatar`}
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                </div>

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

        {/* Charts container - flex grow with two charts side-by-side */}
        <div className="flex-1 flex gap-6">
          {/* Doughnut Chart - half width */}
          <div className="bg-white p-6 rounded shadow flex items-center justify-center w-1/2">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          {/* Bar Chart - half width */}
          <div className="bg-white p-6 rounded shadow flex items-center justify-center w-1/2">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
