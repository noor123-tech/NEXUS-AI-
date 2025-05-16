import React, { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 👈 Add loading state

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/register', {
        name,
        email,
        password,
      });
      setLoading(false); // Stop loading
      alert('Registration successful! Please verify your email before logging in.');
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loading on error too
      setError('Registration failed. Maybe user already exists.');
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
      justifyContent: 'center'
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
          <h2 style={{ margin: '10px 0 5px' }}>Sign up</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>
            We just need a few details to get you started.
          </p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '5px' }}>Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
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

          <button type="submit" disabled={loading} style={{
            padding: '10px',
            backgroundColor: loading ? '#888' : '#000',
            color: '#fff',
            borderRadius: '6px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}>
            {loading ? 'Registering...' : 'Sign up'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <hr style={{ margin: '20px 0' }} />

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            alert('Google login failed');
          }}
          useOneTap
        />

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '20px' }}>
          Already have an account? <Link to="/signin">Click here to Login</Link>
        </p>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '20px' }}>
          By signing up you agree to our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Terms</span>.
        </p>
      </div>
    </div>
  );
}

export default Register;
