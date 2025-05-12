import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setShowForgot(false);

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
  
      });
      const userData = {
        message: response.data.message,
        name: response.data.name,  // ✅ Comes from FastAPI login response
        token: response.data.access_token,
        email: response.data.email,
      };
      alert('Login successful!');
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = '/';
    } catch (error) {
      setError('Invalid credentials');
      setShowForgot(true);
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    const googleUserData = {
      message: decoded.email,
      name: decoded.name,
      imageUrl: decoded.picture,
    };

    alert('Google login successful');
    localStorage.setItem('user', JSON.stringify(googleUserData));
    window.location.href = '/';
  };

  return (
    <div style={{
      backgroundColor: '#1f1f1f',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      visibility: 'visible'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        width: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            margin: '0 auto',
            borderRadius: '50%',
            border: '2px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#000'
            }}></div>
          </div>
          <h2 style={{ margin: '10px 0 5px' }}>Sign In</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Please enter your details to continue.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              placeholder="hi@yourcompany.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
          </div>

          <button type="submit" style={{
            padding: '10px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Sign In
          </button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showForgot && (
          <p style={{ textAlign: 'center' }}>
            Forgot password?{" "}
            <Link to="/forgot-password" state={{ email }} style={{ textDecoration: 'underline' }}>
              Reset here
            </Link>
          </p>
        )}

        <hr style={{ margin: '20px 0' }} />

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert('Google login failed');
          }}
          useOneTap
          style={{
            padding: '10px',
            backgroundColor: '#4285F4',
            color: '#fff',
            borderRadius: '6px',
            fontWeight: 'bold',
            width: '100%',
            textAlign: 'center'
          }}
        >
          Continue with Google
        </GoogleLogin>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '20px' }}>
          By signing up you agree to our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms</span>.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
