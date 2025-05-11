// ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/signin"), 2000);
    } else {
      setMessage(data.detail || "Reset failed");
    }
  };

 
  return (
    <div style={{ backgroundColor: '#1f1f1f', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', width: '400px' }}>
        <h2 style={{ textAlign: 'center' }}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#000', color: '#fff', borderRadius: '6px' }}>Reset Password</button>
          <p style={{ textAlign: 'center' }}>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
