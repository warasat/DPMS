// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from "../context/AppContext";

const PrescriptionModal = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { appointmentId } = useParams(); // Get appointmentId from the URL
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/get-prescription/${appointmentId}`, {
          headers: { token }
        });

        if (response.data.success) {
          setPrescriptionData(response.data.prescription); // Set prescription data
        } else {
          console.error("Prescription not found");
        }
      } catch (error) {
        console.error("Error fetching prescription:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionData();
  }, [appointmentId]); // Re-fetch prescription data when appointmentId changes

  if (loading) {
    return <div className="text-center py-4 text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-800 bg-opacity-40 flex justify-center items-center p-4">
      <div className="bg-white w-full sm:w-11/12 md:w-2/3 lg:w-1/2 xl:w-2/3 2xl:w-1/2 rounded-lg shadow-xl p-8 space-y-6">
        <h3 className="text-3xl font-semibold text-center text-gray-800">Prescription Details</h3>
        
        {prescriptionData ? (
          <div className="space-y-6">
            {/* Patient Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Patient Information</h4>
              <div className="space-y-2">
                <p className="font-medium text-lg text-gray-700"><strong>Name:</strong> {prescriptionData.patientDetails.name}</p>
                <p className="text-gray-600"><strong>Age:</strong> {prescriptionData.patientDetails.age}</p>
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Doctor Information</h4>
              <div className="space-y-2">
                <p className="font-medium text-lg text-gray-700"><strong>Name:</strong> {prescriptionData.doctorDetails.name}</p>
                <p className="text-gray-600"><strong>Age:</strong> {prescriptionData.doctorDetails.age}</p>
              </div>
            </div>

            {/* Prescription Details */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Prescription Details</h4>
              <div className="space-y-2">
                <p className="font-medium text-lg text-gray-700"><strong>Description:</strong></p>
                <p className="text-gray-600">{prescriptionData.description}</p>
              </div>
            </div>

            {/* Medicines */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Medicines</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-700"><strong>Medicine 1:</strong></p>
                  <p className="text-gray-600">{prescriptionData.medicineDetails.medicine1}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-700"><strong>Medicine 2:</strong></p>
                  <p className="text-gray-600">{prescriptionData.medicineDetails.medicine2}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-lg text-gray-700"><strong>Medicine 3:</strong></p>
                  <p className="text-gray-600">{prescriptionData.medicineDetails.medicine3}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">No prescription data available.</p>
        )}

        {/* Close Button */}
        <div className="text-center">
          <button
            onClick={() => window.history.back()}
            className="py-2 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;


