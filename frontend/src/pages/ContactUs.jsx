/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext"; // Importing AppContext
import { toast } from "react-toastify";
import axios from "axios";

const ContactUs = () => {
  // State to manage form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  // Accessing backend URL from AppContext
  const { backendUrl, token } = useContext(AppContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !phone || !comment) {
      return toast.error("Please fill all fields.");
    }

    try {
      const formData = { name, email, phone, comment };

      // Sending form data to the backend
      const response = await axios.post(
        backendUrl + "/api/user/contact-form",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Your message has been sent!");
        // Reset form fields after successful submission
        setName("");
        setEmail("");
        setPhone("");
        setComment("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 items-start">
      {/* Left Side: Text Section */}
      <div className="lg:w-1/2">
        <h2 className="text-4xl font-semibold mb-6">We are here to help!</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Let us know how we can best serve you. Use the contact form to email
          us or select from the topics below that best fit your needs. Its an
          honor to support you in your journey towards better health.
        </p>
      </div>

      {/* Right Side: Form Section */}
      <div className="lg:w-1/2 w-full bg-white shadow-md p-6 rounded-md">
        <p className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Contact Us
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full border p-2 rounded ${
                name !== "" && !/^[a-zA-Z\s]*$/.test(name)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Name"
              required
            />
            {name !== "" && !/^[a-zA-Z\s]*$/.test(name) && (
              <p className="text-red-500 text-sm mt-1">
                Name must contain only letters (no numbers or special
                characters).
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border p-2 rounded ${
                email !== "" && !/^[a-zA-Z]/.test(email)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Email"
              required
            />
            {email !== "" && !/^[a-zA-Z]/.test(email) && (
              <p className="text-red-500 text-sm mt-1">
                Email must start with an alphabet (a-z or A-Z).
              </p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border p-2 rounded ${
                phone !== "" && !/^[0-9]+$/.test(phone)
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Phone number"
              required
            />
            {phone !== "" && !/^[0-9]+$/.test(phone) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid positive number.
              </p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Comment"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-48 bg-rose-400 text-white py-2 px-4 rounded-md font-semibold hover:bg-rose-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
