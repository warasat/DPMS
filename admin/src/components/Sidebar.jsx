/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      {aToken && (
        <div className=" w-64 bg-gray-100  p-4">
          <ul>
            <li className="mb-6">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.home_icon}
                  alt="Dashboard Icon"
                  className="w-6 h-6"
                />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li className="mb-6">
              <NavLink
                to="/all-appointments"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.appointment_icon}
                  alt="Appointments Icon"
                  className="w-6 h-6"
                />
                <p>Appointments</p>
              </NavLink>
            </li>
            <li className="mb-6">
              <NavLink
                to="/add-doctor"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.add_icon}
                  alt="Add Doctor Icon"
                  className="w-6 h-6"
                />
                <p>Add Doctor</p>
              </NavLink>
            </li>
            <li className="mb-6">
              <NavLink
                to="/doctor-list"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.people_icon}
                  alt="Doctor List Icon"
                  className="w-6 h-6"
                />
                <p>Doctors list</p>
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {dToken && (
        <div className=" w-64 bg-gray-100  p-4">
          <ul>
            <li className="mb-6">
              <NavLink
                to="/doctor-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.home_icon}
                  alt="Dashboard Icon"
                  className="w-6 h-6"
                />
                <p className="hidden md:block">Dashboard</p>
              </NavLink>
            </li>
            <li className="mb-6">
              <NavLink
                to="/doctor-appointments"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.appointment_icon}
                  alt="Appointments Icon"
                  className="w-6 h-6"
                />
                <p className="hidden md:block">Appointments</p>
              </NavLink>
            </li>

            <li className="mb-6">
              <NavLink
                to="/doctor-profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-2 text-white bg-blue-900 p-2 rounded-md"
                    : "flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                }
              >
                <img
                  src={assets.people_icon}
                  alt="Doctor List Icon"
                  className="w-6 h-6"
                />
                <p className="hidden md:block">Profile</p>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
