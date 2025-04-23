/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // ✅ Use real-time doctors from context

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext); // 🔄 Get live data
  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors && doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(filtered);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2 text-center">
        Top Related Doctors
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60 bg-blue-200 object-cover rounded-md"
            />
            <div className="mt-4">
              {/* ✅ Availability Status */}
              <div className="flex items-center space-x-2">
                <p
                  className={`w-2 h-2 ${
                    item.available ? "bg-green-500" : "bg-gray-500"
                  } rounded-full`}
                ></p>
                <p
                  className={`${
                    item.available ? "text-green-600" : "text-gray-500"
                  } font-medium`}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>

              <div className="mt-2">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
