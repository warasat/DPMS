import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/my-appointments")}>
        Payment Cancel{" "}
      </button>
    </div>
  );
};

export default PaymentCancel;
