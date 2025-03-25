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

import { useState } from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        console.log("Backend Response: ", data); // Log entire response

        if (data.success) {
          console.log("Token: ", data.token); // Log token
          localStorage.setItem("aToken", data.token);
          setAToken(data.token); // Save token using context
        } else {
          //console.log("Login failed: ", data.message);  // Log error message from backend
          toast.error(data.message);
        }
      } else {
        // Logic for doctor login here
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          console.log("Token: ", data.token); // Log token
          localStorage.setItem("dToken", data.token);
          setDToken(data.token); // Save token using context
          console.log(data.token);
        } else {
          //console.log("Login failed: ", data.message);  // Log error message from backend
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <form
      className="min-h-[80vh] flex items-center "
      onSubmit={onsubmitHandler}
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {state === "Admin" ? (
          <button>
            Doctor Login?{" "}
            <span onClick={() => setState("Doctor")}>Click Here</span>
          </button>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline"
              onClick={() => setState("Admin")}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
