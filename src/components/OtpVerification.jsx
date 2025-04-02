import React, { useState } from "react";

const OtpVerification = ({ email, onSubmit }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      onSubmit(otp); // Pass OTP for verification
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Verify OTP</h2>
      <p>An OTP has been sent to: <strong>{email}</strong></p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength="6"
        placeholder="Enter OTP"
        style={{ width: "92%" }}
      />
      <button onClick={handleSubmit}>Verify OTP</button>
    </div>
  );
};

export default OtpVerification;
