/* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const { data } = await axios.post(`/api/user/reset-password/${token}`, { newPassword });
//       if (data.success) {
//         setMessage("Password reset successfully.");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Error resetting password. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="w-full max-w-md p-8 border rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
//         <p>Please enter your new password.</p>
//         <div className="mt-4">
//           <label>New Password</label>
//           <input
//             type="password"
//             className="w-full border border-zinc-300 rounded p-2 mt-1"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="w-full py-2 mt-4 bg-primary text-white rounded-md">
//           Reset Password
//         </button>
//         {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams();  // Get token from the URL
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make API call to verify OTP and reset password
//       const { data } = await axios.post(`/api/user/verify-otp-and-reset-password/${token}`, { otp, newPassword });

//       if (data.success) {
//         setMessage('Password reset successfully.');
//       } else {
//         setMessage(data.message || 'Error resetting password.');
//       }
//     } catch (error) {
//       setMessage('An error occurred while resetting the password.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter your new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;

