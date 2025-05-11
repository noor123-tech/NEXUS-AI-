import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Please check your email. We have sent a reset link.");
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } else {
      setMessage("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div style={{
      backgroundColor: '#1f1f1f',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            margin: '0 auto',
            borderRadius: '50%',
            border: '2px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#000',
            }}></div>
          </div>
          <h2 style={{ margin: '10px 0 5px' }}>Forgot Password</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Enter your email and new password.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              placeholder="hi@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div>

          {/* <div>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
            />
          </div> */}

          <button type="submit" style={{
            padding: '10px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>
            Reset Password
          </button>

          {message && (
            <p style={{
              textAlign: 'center',
              color: message.includes('Failed') ? 'red' : 'green',
              fontSize: '14px',
              marginTop: '15px',
            }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
