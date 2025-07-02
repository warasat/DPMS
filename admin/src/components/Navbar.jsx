/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { FaUserMd } from 'react-icons/fa';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-4 py-3 p- border-b  bg-blue-900 text-white">
      <div className="flex items-center gap-2 text-xs">
        <a className="btn btn-ghost text-xl"><FaUserMd className="inline-block mr-2" /> MediConnect_Doctor & Patient</a>
        <p className="border px-2.5 py-0.5  rounded-full border-white-500 text-white-600 ">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="btn bg-white text-blue-900 hover:bg-gray-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
