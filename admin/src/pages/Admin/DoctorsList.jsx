/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailablity } =
    useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // Filter doctors based on name or specialty
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="flex items-center gap-2 border border-gray-200 hover:border-blue-500 rounded-xl p-2 max-w-sm w-full">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            className="focus:outline-none w-full pl-2" // Ensures input fills the rest of the space
            placeholder="Search "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap w-full pt-5 gap-4 gap-y-6">
        {filteredDoctors.map((item, index) => (
          <div
            className="border border-indigo-200 rounded-xl max-w-48 overflow-hidden cursor-pointer group"
            key={index}
          >
            <img
              className="bg-indigo-100 group-hover:bg-primary transition-all duration-500"
              src={item.image}
              alt=""
            />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">
                {item.name}
              </p>
              <p className="text-zinc-600 text-sm">{item.speciality}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailablity(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
