import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "100%" }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "100%" }}
          required
        />
        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          Sign In
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {showForgot && (
        <p>
          Forgot password?{" "}
          <Link to="/forgot-password" state={{ email }}>
            Reset here
          </Link>
        </p>
      )}

      <hr style={{ margin: "20px 0" }} />

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          alert('Google login failed');
        }}
      />
    </div>
  );
}

export default SignIn;
