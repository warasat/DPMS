/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("address", JSON.stringify(userData.address));
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm ml-10 mt-2">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img
                className="w-36 rounded opacity-75"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />

              <img
                className="w-10 absolute bottom-12 right-12"
                src={image ? "" : assets.upload_icon}
                alt=""
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img src={userData.image} className="w-36 rounded" alt="" />
        )}

        {isEdit ? (
          <input
            type="text"
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3  ">
            Contact Information
          </p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email Id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">phone:</p>
            {isEdit ? (
              <input
                type="number"
                className="bg-gray-100  max-w-52 "
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  className="bg-gray-50"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-50"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  type="text"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3  ">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};
export default MyProfile;

// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import Modal from "./Modal";

// const Profile = () => {
//   const navigate = useNavigate();

//   const galleryImages = [
//     { id: 1, src: assets.DocImage1 },
//     { id: 2, src: assets.DocImage2 },
//     { id: 3, src: assets.DocImage3 },
//     { id: 4, src: assets.DocImage4 },
//     { id: 5, src: assets.DocImage5 },
//     { id: 6, src: assets.DocImage6 },
//     { id: 7, src: assets.DocImage7 },
//     { id: 8, src: assets.DocImage8 },
//     { id: 9, src: assets.DocImage9 },
//     { id: 10, src: assets.DocImage10 },
//     { id: 11, src: assets.DocImage7 },
//     { id: 12, src: assets.DocImage1 },
//     { id: 13, src: assets.DocImage4 },
//   ];

//   const [selectedImage, setSelectedImage] = useState(null);

//   // Function to handle image click
//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const handleHomeButton = () => {
//     navigate("/my-profile/homevisit"); // Correct path
//   };

//   const handleClinicButton = () => {
//     navigate("/my-profile/clinicvisit"); // Correct path
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 mt-10">
//       <div className="flex items-center mb-8">
//         <img
//           src={assets.Doctor_Profile}
//           alt="Doctor Profile"
//           className="w-32 h-32 rounded-full object-cover"
//         />
//         <div className="ml-6 flex-1 text-center md:text-left">
//           <h1 className="text-3xl font-bold">Dr. Sarah Johnson</h1>
//           <p className="text-gray-600 mt-1">
//             Cardiologist | 10+ Years Experience
//           </p>
//           <p className="text-gray-500 mt-1">New York, NY</p>

//           {/* Visit Options Aligned Horizontally and Centered */}
//           <div className="flex justify-center md:justify-start mt-4 space-x-8">
//             <div className="text-center">
//               <p className="text-2xl font-semibold">$500</p>
//               <button
//                 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
//                 onClick={handleHomeButton}
//               >
//                 Home Visit
//               </button>
//             </div>
//             <div className="text-center">
//               <p className="text-2xl font-semibold">$900</p>
//               <button
//                 className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
//                 onClick={handleClinicButton}
//               >
//                 Clinic Visit
//               </button>
//             </div>
//             <div className="text-center">
//               <Modal />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Photo Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//         {galleryImages.map((image) => (
//           <img
//             key={image.id}
//             src={image.src}
//             alt={`gallery-${image.id}`}
//             className="rounded-lg shadow-md cursor-pointer object-cover w-full h-40"
//             onClick={() => handleImageClick(image)}
//           />
//         ))}
//       </div>

//       {/* Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg relative max-w-lg w-full">
//             <img
//               src={selectedImage.src}
//               alt={`Selected-${selectedImage.id}`}
//               className="rounded-lg w-full"
//             />
//             <button
//               onClick={closeModal}
//               className="absolute top-1 right-2  text-black p-2 bg-white"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//       <div className="mt-20 px-6">
//         {/* Area of Interest Section */}
//         <div className="mb-8">
//           <h1 className="text-black font-bold text-xl mb-6">Area of Interest</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Chronic Disease */}
//             <div className="flex flex-col items-center">
//               <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center">
//                 <img
//                   src="path/to/chronic-disease-icon.svg"
//                   alt="Chronic Disease Icon"
//                   className="w-8 h-8"
//                 />
//               </div>
//               <p className="text-gray-700 mt-2 text-center">
//                 Chronic Disease Management
//               </p>
//             </div>

//             {/* Ear, Nose, and Throat */}
//             <div className="flex flex-col items-center">
//               <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
//                 <img
//                   src="path/to/ear-nose-throat-icon.svg"
//                   alt="Ear Nose and Throat Icon"
//                   className="w-8 h-8"
//                 />
//               </div>
//               <p className="text-gray-700 mt-2 text-center">Ear Nose and Throat</p>
//             </div>
//           </div>
//         </div>

//         {/* Qualification Section */}
//         <div className="mb-8">
//           <h1 className="text-black font-bold text-xl mb-4">Qualification</h1>
//           <ul className="list-disc ml-8 text-gray-700">
//             <li>MBBS, XYZ University</li>
//             <li>Specialization in Cardiology, ABC Institute</li>
//             <li>10+ Years of Clinical Experience</li>
//           </ul>
//         </div>

//         {/* Languages Section */}
//         <div>
//           <h1 className="text-black font-bold text-xl mb-4">Languages</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* English Button */}
//             <div className="flex justify-center">
//               <button className="bg-blue-200 text-blue-800 px-6 py-2 rounded-lg border border-blue-300 shadow-md">
//                 English
//               </button>
//             </div>

//             {/* Urdu Button */}
//             <div className="flex justify-center">
//               <button className="bg-blue-200 text-blue-800 px-6 py-2 rounded-lg border border-blue-300 shadow-md">
//                 Urdu
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
