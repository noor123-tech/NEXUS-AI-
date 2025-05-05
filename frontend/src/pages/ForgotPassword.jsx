import React from "react";
import {useState} from "react";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_password: newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Password updated. Try logging in again.");
    } else {
      setMessage(data.detail || "Failed to reset password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" required />
      <button type="submit">Reset Password</button>
      <p>{message}</p>
    </form>
  );
};
export  default  ForgotPassword;
