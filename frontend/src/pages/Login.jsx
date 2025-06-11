// /* eslint-disable no-unused-vars */
// import React from "react";
// import { useNavigate } from "react-router-dom";
// const Login = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//           <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6">
//             {/* Email Input */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm/6 font-medium text-gray-900"
//               >
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   autoComplete="email"
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <div className="flex items-center justify-between">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm/6 font-medium text-gray-900"
//                 >
//                   Password
//                 </label>
//                 <div className="text-sm">
//                   <a
//                     href="#"
//                     className="font-semibold text-indigo-600 hover:text-indigo-500"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <input
//                   type="password"
//                   name="password"
//                   id="password"
//                   autoComplete="current-password"
//                   required
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 onClick={() => navigate("/")}
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//           {/* Sign up Link */}
//           <p className="mt-10 text-center text-sm/6 text-gray-500">
//             Not a member?
//             <a
//               href="#"
//               className="font-semibold text-indigo-600 hover:text-indigo-500"
//             >
//               Start a 14 day free trial
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

//export default Login;

/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = async () => {
    try {
      await axios.post(`${backendUrl}/api/otp/send-otp`, { email });
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${backendUrl}/api/otp/verify-otp`, { email, otp });
      toast.success("OTP verified!");
      setOtpVerified(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        if (!otpVerified) {
          toast.error("Please verify OTP before signing up.");
          return;
        }

        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Account created successfully!");
          // navigate("/");
          setState("Login");
        } else {
          toast.error(data.message || "Sign up failed.");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        const data = response.data;

        if (response.status === 200 && data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully!");
          navigate("/");
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error("Incorrect credentials");
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to Book
          Appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setOtpSent(false);
              setOtpVerified(false);
            }}
            value={email}
            required
          />
        </div>

        {state === "Sign Up" && !otpSent && (
          <button
            type="button"
            onClick={sendOtp}
            className="bg-blue-600 text-white w-full py-2 rounded-md text-sm"
          >
            Send OTP
          </button>
        )}

        {state === "Sign Up" && otpSent && !otpVerified && (
          <>
            <div className="w-full">
              <p>Enter OTP</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={verifyOtp}
              className="bg-green-600 text-white w-full py-2 rounded-md text-sm"
            >
              Verify OTP
            </button>
          </>
        )}

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
                setOtpSent(false);
                setOtpVerified(false);
              }}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
                setOtpSent(false);
                setOtpVerified(false);
              }}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
