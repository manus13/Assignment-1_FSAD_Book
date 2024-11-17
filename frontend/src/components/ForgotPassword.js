import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './styles/ForgotPassword.css'

function ForgotPassword() {
    const [email, setEmail] = useState();
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otpValid, setOtpValid] = useState(false);
    const navigate = useNavigate();
    const handleSendOTP = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
          console.log(response.data);
          setOtpSent(true);
      } catch (error) {
          console.error("Error sending OTP:", error);
      }
  };

  const handleValidateOTP = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/api/auth/validate-otp', { email, otp });
        if (response.data.Status === "OTP validated") {
            setOtpValid(true); 
            alert("OTP validated successfully. Please set your new password.");
        } else {
            alert("Invalid or expired OTP. Please try again.");
        }
    } catch (error) {
        console.error("Error validating OTP:", error);
    }
};

  const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
          console.log(response.data);
          alert("Password reset successful. Please log in with your new password.");
          window.location.href = "/";
          if (response.data.Status === "Password reset successful") {
          }
      } catch (error) {
          console.error("Error resetting password:", error);
      }
  };

    return (
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="bg-white p-3 rounded w-25">
              <h2>Forgot Password</h2>
        <form onSubmit={otpSent && otpValid ? handleResetPassword : otpSent ? handleValidateOTP : handleSendOTP}>

                  <div>
                      <label>Email </label>
                      <input
                          type="email"
                          placeholder="Enter Email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                      />
                  </div>
                  {otpSent && !otpValid && (
                      <>
                          <div className="titleforgot">
                              <label><strong>OTP</strong></label>
                              <input
                                  type="text"
                                  placeholder="Enter OTP"
                                  className="form-control"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  required
                              />
                           </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Validate OTP
                            </button>
                        </>
                    )}
                    {otpSent && otpValid && (
                        <>
                            <div className="titleforgot">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter New Password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">
                                Reset Password
                            </button>
                        </>
                    )}
                       {!otpSent && (
                        <button type="submit" className=" btn btn-success w-100">
                            Send OTP
                        </button>
                    )}
              </form>
          </div>
      </div>
  );
}

export default ForgotPassword;