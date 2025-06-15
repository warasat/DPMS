/* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { assets } from "../assets/assets"; // Ensure profile_pic is defined in this file

// function Navbar() {
//   const [isSticky, setIsSticky] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
//   const [profilePic, setProfilePic] = useState(""); // State for the profile picture

//   const navigate = useNavigate();
//   const location = useLocation(); // Get current route

//   // Track scroll position with useEffect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Mock login function
//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setProfilePic(assets.profile_pic); // Set the profile picture URL from assets
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setIsLoggedIn(false); // Set the user as logged out
//     setProfilePic(""); // Clear the profile picture
//     navigate("/login"); // Redirect to the login page
//   };

//   // Don't render navbar on login page
//   if (location.pathname === "/login" || location.pathname === "/logout") {
//     return null; // Don't render the Navbar on login or logout page
//   }

//   return (
//     <div className="relative">
//       <div
//         className={`navbar bg-blue-900 text-white ${
//           isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
//         }`}
//       >
//         <div className="navbar-start">
//           <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-blue-800 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
//             >
//               <li>
//                 <a>Home</a>
//               </li>
//               <li>
//                 <a>All Doctors</a>
//               </li>
//               <li>
//                 <a>About</a>
//               </li>
//             </ul>
//           </div>
//           <a className="btn btn-ghost text-xl">Doctor & Patient</a>
//         </div>

//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li>
//               <NavLink to="/" className="hover:bg-gray-400">
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="doctors" className="hover:bg-gray-400">
//                 All Doctors
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="about" className="hover:bg-gray-400">
//                 About
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="contact" className="hover:bg-gray-400">
//                 Contact
//               </NavLink>
//             </li>
//           </ul>
//         </div>

//         <div className="navbar-end">
//           {!isLoggedIn ? (
//             <button
//               className="btn bg-white text-blue-900 hover:bg-gray-200"
//               onClick={handleLogin} // Handle login on button click
//             >
//               Create account
//             </button>
//           ) : (
//             <div className="flex items-center space-x-2 cursor-pointer group relative">
//               <img
//                 src={profilePic}
//                 alt="Profile"
//                 className="w-8 h-8 rounded-full"
//               />
//               <img src={assets.dropdown_icon} alt="Dropdown Icon" />
//               <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
//                 <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                   <NavLink
//                     to="/my-profile"
//                     className="hover:text-black cursor-pointer"
//                   >
//                     My profile
//                   </NavLink>
//                   <NavLink
//                     to="/my-appointments"
//                     className="hover:text-black cursor-pointer"
//                   >
//                     My appointments
//                   </NavLink>
//                   <button
//                     className="hover:text-black cursor-pointer "
//                     onClick={handleLogout} // Handle logout
//                   >
//                     Log out
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Access token, userData from context
import { assets } from "../assets/assets";

function Navbar() {
  const { token, setToken, userData } = useContext(AppContext);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔒 Logout Logic — clear token and go to login page
  const handleLogout = () => {
    setToken(null); // Clear token in context
    localStorage.removeItem("token"); // Clear from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Don't show navbar on login or logout pages
  if (location.pathname === "/login" || location.pathname === "/logout") {
    return null;
  }

  return (
    <div className="relative">
      <div
        className={`navbar bg-blue-900 text-white ${
          isSticky ? "fixed top-0 left-0 right-0 z-50 shadow-md" : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-blue-800 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/doctors">All Doctors</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
            </ul>
          </div>
          
          <NavLink to="/" className="btn btn-ghost text-xl">
            Doctor & Patient
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/" className="hover:bg-gray-400">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className="hover:bg-gray-400">
                All Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:bg-gray-400">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:bg-gray-400">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {!token ? (
            <NavLink
              to="/login"
              className="btn bg-white text-blue-900 hover:bg-gray-200"
            >
              Login
            </NavLink>
          ) : (
            <div className="flex items-center space-x-2 cursor-pointer group relative">
              <img
                src={userData?.image || assets.profile_pic}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <img src={assets.dropdown_icon} alt="Dropdown Icon" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <NavLink to="/my-profile" className="hover:text-black">
                    My profile
                  </NavLink>
                  <NavLink to="/my-appointments" className="hover:text-black">
                    My appointments
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="hover:text-black pr-24"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
