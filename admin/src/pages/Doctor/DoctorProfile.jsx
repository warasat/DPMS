/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//     useContext(DoctorContext);
//   const { currency } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available
//       }
//       const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData,{headers: {dToken}})
//       if(data.success){
//         toast.success(data.message)
//         setIsEdit(false)
//         getProfileData()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     if (dToken) {
//       getProfileData();
//     }
//   }, [dToken]);
//   return (
//     profileData && (
//       <div>
//         <div className="flex flex-col gap-4 m-5">
//           <div>
//             <img
//               className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
//               src={profileData.image}
//               alt=""
//             />
//           </div>
//           <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//             {/* {doc info: name,degree, experience -----} */}
//             <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//               {profileData.name}
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-gray-600">
//               <p>
//                 {profileData.degree} - {profileData.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded full">
//                 {profileData.experience}
//               </button>
//             </div>
//             {/* {------doc about-----} */}
//             <div>
//               <p className="flex items-center gap-1 text-sm  font-medium text-neutral-800 mt-3">
//                 About:
//               </p>
//               <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                 {profileData.about}
//               </p>
//             </div>
//             <p className="text-gray-600 font-medium mt-4">
//               Appointment fee:{" "}
//               <span className="text-gray-800">
//                 {currency}
//                 {isEdit ? (
//                   <input
//                     type="number"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         fees: e.target.value,
//                       }))
//                     }
//                     value={profileData.fees}
//                   />
//                 ) : (
//                   profileData.fees
//                 )}
//               </span>
//             </p>
//             <div className="flex gap-2 py-2">
//               <p>Address:</p>
//               <p className="text-sm">
//                 {isEdit ? (
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: e.target.value,
//                       }))
//                     }
//                     value={profileData.address}
//                   />
//                 ) : (
//                   profileData.address
//                 )}
//               </p>
//             </div>
//             <div className="flex gap-1 pt-2">
//               <input
//                 onChange={() =>
//                   isEdit &&
//                   setProfileData((prev) => ({
//                     ...prev,
//                     available: !prev.available,
//                   }))
//                 }
//                 checked={profileData.available}
//                 type="checkbox"
//                 name=""
//                 id=""
//               />
//               <label htmlFor="">Available</label>
//             </div>
//             {isEdit ? (
//               <button
//                 onClick={updateProfile}
//                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//               >
//                 save
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorProfile;

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  // Save original profile data for cancel
  const [originalProfile, setOriginalProfile] = useState(null);

  // When entering edit mode, save a copy of profileData
  const handleEditClick = () => {
    setOriginalProfile(profileData);
    setIsEdit(true);
  };

  // Cancel changes and revert to original data
  const handleCancelClick = () => {
    setProfileData(originalProfile);
    setIsEdit(false);
  };

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* doc info: name,degree, experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded full">
                {profileData.experience}
              </button>
            </div>
            {/* doc about */}
            <div>
              <p className="flex items-center gap-1 text-sm  font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
  Appointment fee:{" "}
  <span className="text-gray-800">
    {currency}
    {isEdit ? (
      <input
        type="number"
        onChange={(e) =>
          setProfileData((prev) => ({
            ...prev,
            fees: e.target.value,
          }))
        }
        value={profileData.fees}
        min="1"
        step="1" // Ensures that only integers are allowed
        onInput={(e) => {
          // Ensure the value is a valid positive integer
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
      />
    ) : (
      profileData.fees
    )}
  </span>
</p>
 <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    value={profileData.address.line1 + " " + profileData.address.line2} // Make sure to handle the address object
                  />
                ) : (
                  profileData.address.line1 + " " + profileData.address.line2
                )}
              </p>
            </div>
            <div className="flex gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                checked={profileData.available}
                type="checkbox"
                name=""
                id=""
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <div className="flex gap-4 mt-5">
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 border border-primary text-sm rounded-full hover:bg-primary hover:text-white transition-all"
                >
                  Save Information
                </button>
                <button
                  onClick={handleCancelClick}
                  className="px-4 py-1 border border-red-600 text-sm rounded-full hover:bg-red-600 hover:text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEditClick}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

