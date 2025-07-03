/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
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

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  if (!dashData) return null;

  // Aggregated counts
  const completedCount = dashData.totalCompletedAppointments || 0;
  const cancelledCount = dashData.totalCancelledAppointments || 0;
  const pendingCount = Math.max(0, dashData.appointments - completedCount - cancelledCount);
  const totalCount = dashData.appointments || completedCount + cancelledCount;

  // Doughnut chart data: Total appointments, patients, doctors
  const doughnutData = {
    labels: ["Appointments", "Patients", "Earnings"],
    datasets: [
      {
        label: "Count",
        data: [dashData.appointments, dashData.patients, dashData.earnings],
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
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{currency}{dashData.earnings}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="Appointments" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
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
              <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                <img className="rounded-full w-10" src={item.userData.image} alt={`${item.userData.name} Avatar`} />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {item.cancelled ? (
                    <p className="text-red-500 font-medium text-xs">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 font-medium text-xs">Completed</p>
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

export default DoctorDashboard;
