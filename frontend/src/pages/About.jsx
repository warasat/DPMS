/* eslint-disable no-unused-vars */
import React from "react";
import { assets } from "../assets/assets";
import ContactUs from "./ContactUs";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12 ml-8">
        <img
          src={assets.about_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            we believe trust is the cornerstone of effective healthcare
            management. Our Doctor and Patient Management System is built on a
            foundation of reliability, security, and innovation, ensuring that
            your sensitive medical data is always protected. Designed to
            streamline operations for healthcare providers and enhance the
            patient experience, our platform combines state-of-the-art
            technology with a user-friendly interface. Whether you were
            scheduling appointments, managing medical records, or conducting
            virtual consultations, you can trust us to deliver seamless,
            efficient, and secure solutions tailored to your needs. Together, we
            were redefining the future of healthcare.
          </p>
          <b className="text-gray-800">OUR VISION</b>
          <p>
            To bridge the gap between doctors and patients through technology,
            fostering trust, seamless care, and stronger connections. We aim to
            simplify healthcare workflows while ensuring personalized and
            compassionate experiences for everyone.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          Why <span className="text-gray-800 font-semibold "> Choose US </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className=" rounded-md border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5  text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>
            Streamline your workflow with our intuitive platform, ensuring
            quicker decision-making and better time management. Experience the
            power of seamless operations, allowing healthcare providers to focus
            more on patient care.
          </p>
        </div>
        <div className=" rounded-md mx-2 border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5  text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>
            Access essential healthcare features anytime, anywhere, with just a
            few clicks. Our system provides hassle-free scheduling, patient
            management, and more, all in one place, for a truly effortless
            experience.
          </p>
        </div>
        <div className="rounded-md border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5  text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization </b>
          <p>
            Tailor care to each patient unique needs with our flexible,
            customizable features. From personalized treatment plans to easy
            communication, we put your patients at the center of every decision.
          </p>
        </div>
      </div>
      <div>
        <ContactUs/>
      </div>
    </div>
    
  );
};

export default About;
