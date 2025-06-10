/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function TopDoctors() {
  const [showAll, setShowAll] = useState(false); // State to toggle doctor list
  const navigate = useNavigate();

  const handleShowAllClick = () => {
    setShowAll(true); // Show all doctors when the button is clicked
  };

  const doctorsToDisplay = showAll ? doctors : doctors.slice(0, 10); // Decide which doctors to show

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2 text-center">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctorsToDisplay.map((item, index) => (
          <div
            // onClick={() => {
            //   navigate(`/appointment/${item._id}`);
            //   scrollTo(0, 0);
            // }}
            key={index}
            className="bg-white p-4 shadow-md rounded-lg cursor-not-allowed hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 bg-blue-200 object-cover rounded-md"
            />
            <div className="mt-4">
              <div className="mt-2">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show the "More" button if we haven't displayed all doctors yet */}
      {!showAll && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowAllClick} // Handle button click to show all doctors
            className="btn btn-primary px-10 py-3 rounded-full font-bold"
          >
            More
          </button>
        </div>
      )}

      {/* After showing all doctors, display a single "Book Appointment" button */}
      {showAll && (
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/doctors")} // Navigate to the /doctors page
            className="btn btn-primary px-10 py-3 rounded-full font-bold"
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
}

export default TopDoctors;


