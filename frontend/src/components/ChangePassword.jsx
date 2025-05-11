import React, { useState } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const token = localStorage.getItem("access_token");
    // console.log("✅ JWT in localStorage:", token); // Debugging JWT in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;
    console.log("✅ JWT in localStorage:", token);

    try {
      const res = await fetch("http://localhost:8000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });
      console.log("✅ Response status:", res.status); // Debugging response status
      const data = await res.json();
      console.log("✅ Response data:", data); // Debugging response data


      if (res.ok) {
        setMessage("✅ Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage(data.detail || "❌ Error updating password");
      }
    } catch (error) {
      setMessage("❌ Network error");
    }
  };

  return (
    <div style={{ backgroundColor: '#1f1f1f', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '10px', width: '400px' }}>
        <h2 style={{ textAlign: 'center' }}>Change Password</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#000', color: '#fff', borderRadius: '6px' }}>Update Password</button>
          <p style={{ textAlign: 'center' }}>{message}</p>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
