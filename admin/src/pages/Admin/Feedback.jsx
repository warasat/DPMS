/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext"; // Importing AdminContext
import { FaSearch } from "react-icons/fa"; // Importing search icon

const ContactFormsList = () => {
  const { aToken, contactForms, getAllContactForms } = useContext(AdminContext);

  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    if (aToken) {
      getAllContactForms(); // Fetch all contact forms when the component is mounted
    }
  }, [aToken]);
   useEffect(() => {
    console.log("contactForms:", contactForms);  // Log the contactForms state to verify
  }, [contactForms]);  // Log whenever contactForms changes

  // Ensure contactForms is defined and then filter
  const filteredContactForms = (contactForms || []).filter((item) => {
    const term = searchTerm.toLowerCase();

    const name = item.name?.toLowerCase() || "";
    const email = item.email?.toLowerCase() || "";
    const phone = item.phone?.toLowerCase() || "";
    const comment = item.comment?.toLowerCase() || "";

    return (
      name.includes(term) ||
      email.includes(term) ||
      phone.includes(term) ||
      comment.includes(term)
    );
  });

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Heading and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <p className="font-medium text-lg text-gray-800">All Contact Forms</p>
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search Contact Forms"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-lg text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_2fr_3fr_3fr] grid-flow-col py-4 px-6 border-b bg-gray-100">
          <p className="text-gray-600 font-semibold">#</p>
          <p className="text-gray-600 font-semibold">Name</p>
          <p className="text-gray-600 font-semibold">Email</p>
          <p className="text-gray-600 font-semibold">Phone</p>
          <p className="text-gray-600 font-semibold">Comment</p>
        </div>

        {/* Displaying contact form list */}
        {filteredContactForms.map((item, index) => (
          <div
            className="flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_3fr_2fr_3fr_3fr] items-center text-gray-500 py-4 px-6 border-b hover:bg-gray-50 transition-all duration-200"
            key={index}
          >
            {/* Index # */}
            <p className="max-sm:hidden text-gray-700 font-medium">{index + 1}</p>

            {/* Contact Form Name */}
            <p className="text-gray-700 font-medium">{item.name}</p>

            {/* Contact Form Email */}
            <p className="text-gray-600">{item.email}</p>

            {/* Contact Form Phone */}
            <p className="text-gray-600">{item.phone}</p>

            {/* Contact Form Comment */}
            <p className="text-gray-600">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFormsList;
