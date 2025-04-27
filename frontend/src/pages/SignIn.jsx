import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        email,
        password,
      });
      alert('Login successful!');

      // Save the complete user object in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Redirect to homepage (optional)
      window.location.href = '/';
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    console.log(credentialResponse);
    alert('Google login successful');

    // Extract necessary data from the Google response
    const googleUserData = {
      email: credentialResponse?.profileObj?.email,
      name: credentialResponse?.profileObj?.name,
      imageUrl: credentialResponse?.profileObj?.imageUrl,
    };

    // Save Google user data in localStorage in the same format as manual login
    localStorage.setItem('user', JSON.stringify({ message: `Welcome, ${googleUserData.email}` }));

    // Redirect to homepage
    window.location.href = '/';
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "100%" }}
      />
      <button onClick={handleLogin} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Sign In
      </button>

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
