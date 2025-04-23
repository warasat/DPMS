/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('/api/user/forgot-password', { email });
//       if (data.success) {
//         setMessage('Please check your email for the reset link.');
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error('Error sending email. Please try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="w-full max-w-md p-8 border rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
//         <p>Please enter your email to reset your password.</p>
//         <div className="mt-4">
//           <label>Email</label>
//           <input
//             type="email"
//             className="w-full border border-zinc-300 rounded p-2 mt-1"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="w-full py-2 mt-4 bg-primary text-white rounded-md">
//           Send Reset Link
//         </button>
//         {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
// import React, { useContext, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';

// const ForgotPassword = () => {
//   const {backendUrl , token} = useContext(AppContext)
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();  // Initialize navigate for routing

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     try {
//       // Send request to your backend to initiate password reset
//       // const { data } = await axios.post( '/api/user/forgot-password', { email });
//       const { data } = await axios.post(backendUrl + '/api/user/forgot-password', { email }, {headers: {token}});
      

//       if (data.success) {
//         // Show success message
//         setMessage('Please check your email for the reset link.');
        
        
//         // Optionally, redirect to a confirmation page or login page
//         //navigate('/login');  // Redirect to login page after successful email submission
//       } else {
//         toast.error(data.message); // Show error message if the API returns an error
//       }
//     } catch (error) {
//       toast.error('Error sending email. Please try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form className="w-full max-w-md p-8 border rounded-lg shadow-lg" onSubmit={handleSubmit}>
//         <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
//         <p>Please enter your email to reset your password.</p>
//         <div className="mt-4">
//           <label>Email</label>
//           <input
//             type="email"
//             className="w-full border border-zinc-300 rounded p-2 mt-1"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="w-full py-2 mt-4 bg-primary text-white rounded-md">
//           Send Reset Link
//         </button>
//         {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


