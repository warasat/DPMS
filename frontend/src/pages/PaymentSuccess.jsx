// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [sessionId, setSessionId] = useState(null);
  const [verified, setVerified] = useState(false);
  const { token } = useContext(AppContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    if (id) {
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    if (!sessionId || verified) return; // Agar sessionId na ho ya pehle se verified ho to return karo

    console.log("🔄 Session ID received from URL:", sessionId);
    setVerified(true); // Prevent duplicate calls

    const verifyPayment = async () => {
      try {
        console.log("🔄 Sending session_id to backend:", sessionId);
        const response = await axios.post(
          `http://localhost:8080/api/user/verify-payment`,
          { session_id: sessionId },
          { headers: { token } }
        );

        console.log("✅ Payment Verification Response:", response.data);

        // Redirect after 5 seconds
        setTimeout(() => {
          navigate("/my-appointments");
        }, 5000);
      } catch (error) {
        console.error(
          "❌ Payment Verification Error:",
          error.response?.data || error.message
        );

        // Redirect after 5 seconds
        setTimeout(() => {
          navigate("/payment-cancel");
        }, 5000);
      }
    };

    verifyPayment();
  }, [sessionId, navigate, verified]);

  return (
    <div>
      <button
        className="font-3xl text-black"
        onClick={() => navigate("/my-appointments")}
      >
        Payment Sucess
      </button>
    </div>
  );
};

export default PaymentSuccess;
