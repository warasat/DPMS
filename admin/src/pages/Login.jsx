// // import React from 'react'
// import { useState } from "react";
// import { assets } from "../assets/assets";
// import { useContext } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from 'axios'

// const Login = () => {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const {setAToken,backendUrl} = useContext(AdminContext)

//  const onsubmitHandler = async (event) => {
//   event.preventDefault();
//   try {

//     if(state === 'Admin') {
//       const {data} = await axios.post(backendUrl + '/api/admin/login', {email,password})
//       if(data.success){
//         console.log(data.token)
//       }
//     } else {

//     }

//   } catch (error) {

//   }
//   }

//   return (
//     <form className="min-h-[80vh] flex items-center ">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold m-auto">
//           <span className="text-primary">{state} </span>
//           Login
//         </p>
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//           onChange={(e) => setPassword(e.target.value)}
//           value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>
//         <button className="bg-primary text-white w-full py-2 rounded-md text-base">
//           Login
//         </button>
//         {state === "Admin" ? (
//           <button>
//             Doctor Login?{" "}
//             <span onClick={() => setState("Doctor")}>Click Here</span>
//           </button>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline"
//               onClick={() => setState("Admin")}
//             >
//               Click Here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useContext } from "react";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { DoctorContext } from "../context/DoctorContext";

// const Login = () => {
//   const [state, setState] = useState("Admin");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { setAToken, backendUrl } = useContext(AdminContext);
//   const { setDToken } = useContext(DoctorContext);
//   const onsubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(backendUrl + "/api/admin/login", {
//           email,
//           password,
//         });

//         console.log("Backend Response: ", data); // Log entire response

//         if (data.success) {
//           console.log("Token: ", data.token); // Log token
//           localStorage.setItem("aToken", data.token);
//           setAToken(data.token); // Save token using context
//         } else {
//           //console.log("Login failed: ", data.message);  // Log error message from backend
//           toast.error(data.message);
//         }
//       } else {
//         // Logic for doctor login here
//         const { data } = await axios.post(backendUrl + "/api/doctor/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           console.log("Token: ", data.token); // Log token
//           localStorage.setItem("dToken", data.token);
//           setDToken(data.token); // Save token using context
//           console.log(data.token);
//         } else {
//           //console.log("Login failed: ", data.message);  // Log error message from backend
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.error("An error occurred: ", error);
//     }
//   };

//   return (
//     <form
//       className="min-h-[80vh] flex items-center "
//       onSubmit={onsubmitHandler}
//     >

//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold m-auto">
//           <span className="text-primary">{state} </span> Login
//         </p>
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base"
//         >
//           Login
//         </button>
//         {state === "Admin" ? (
//           <button>
//             Doctor Login?{" "}
//             <span onClick={() => setState("Doctor")}>Click Here</span>
//           </button>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline"
//               onClick={() => setState("Admin")}
//             >
//               Click Here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// };

// export default Login;

import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin"); // Admin | Doctor | ForgotPassword
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful");
        } else {
          toast.error(data.message);
        }
      } else if (state === "Doctor") {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Login error:", error);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      {state === "ForgotPassword" ? (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">Forgot Password</p>
          <p>Please enter your email to reset password</p>

          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!otpSent && (
            <button
              type="button"
              onClick={async () => {
                try {
                  await axios.post(`${backendUrl}/api/doctor/forgotPassword`, {
                    email,
                  });
                  toast.success("OTP sent to your email");
                  setOtpSent(true);
                } catch (err) {
                  toast.error(
                    err?.response?.data?.message || "Failed to send OTP"
                  );
                }
              }}
              className="bg-blue-600 text-white w-full py-2 rounded-md text-sm"
            >
              Send OTP
            </button>
          )}

          {otpSent && !otpVerified && (
            <>
              <div className="w-full">
                <p>Enter OTP</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await axios.post(
                      `${backendUrl}/api/doctor/forgotPassword/verify`,
                      {
                        email,
                        otp,
                      }
                    );
                    toast.success(
                      "OTP verified. You can now reset your password."
                    );
                    setOtpVerified(true);
                  } catch (err) {
                    toast.error(err?.response?.data?.message || "Invalid OTP");
                  }
                }}
                className="bg-green-600 text-white w-full py-2 rounded-md text-sm"
              >
                Verify OTP
              </button>
            </>
          )}

          {otpVerified && (
            <>
              <div className="w-full">
                <p>New Password</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const { data } = await axios.post(
                      `${backendUrl}/api/doctor/reset-password`,
                      {
                        email,
                        password,
                      }
                    );
                    if (data.success) {
                      toast.success("Password updated. You can now login.");
                      setState("Login");
                      setOtpSent(false);
                      setOtpVerified(false);
                      setEmail("");
                      setPassword("");
                      setOtp("");
                    } else {
                      toast.error(data.message || "Failed to update password.");
                    }
                  } catch (err) {
                    toast.error(
                      err?.response?.data?.message || "Something went wrong."
                    );
                  }
                }}
                className="bg-blue-600 text-white w-full py-2 rounded-md text-base"
              >
                Reset Password
              </button>
            </>
          )}

          <p className="mt-2">
            Remembered your password?{" "}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => {
                setState("Admin");
                setOtpSent(false);
                setOtpVerified(false);
                setOtp("");
              }}
            >
              Go back to Login
            </span>
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-blue-600">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setOtpSent(false);
                setOtpVerified(false);

                const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/;

                if (value.length > 0 && !emailRegex.test(value)) {
                  toast.warn(
                    "Email must start with a character and end with @gmail.com"
                  );
                }
              }}
              value={email}
              required
            />
          </div>

          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                if (value.length > 0 && value.length < 8) {
                  toast.warn("Password must be at least 8 characters");
                }
              }}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md text-base"
          >
            Login
          </button>

          {state === "Admin" ? (
            <button
              type="button"
              onClick={() => setState("Doctor")}
              className="text-blue-600 underline"
            >
              Doctor Login? Click Here
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setState("Admin")}
              className="text-blue-600 underline"
            >
              Admin Login? Click Here
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setState("ForgotPassword");
              setOtpSent(false);
              setOtpVerified(false);
              setOtp("");
            }}
            className="text-red-600 underline"
          >
            Forgot Password?
          </button>
        </div>
      )}
    </form>
  );
};

export default Login;
