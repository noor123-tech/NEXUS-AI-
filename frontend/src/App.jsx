import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from "./components/ChangePassword";
import { useState, useEffect } from 'react';
import './index.css';
import AI from "./pages/AI";
import Home from "./pages/Home";
import React from "react";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import PostBlog from "./pages/PostBlog";
import EmailVerified from "./pages/EmailVerified";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on load
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));  // Parse and set the user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <div style={{ }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-us" element={<ContactUs />} />
       <Route path="/email-verified" element={<EmailVerified/>} />

<Route path="reset-password" element={<ResetPassword/>} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard />
              </PrivateRoute>
            }
          />

    <Route
            path="/AI"
            element={
              <PrivateRoute user={user}>
                <AI/>
              </PrivateRoute>
            }
          />


          <Route
            path="/post-blog"
            element={
              <PrivateRoute user={user}>
                <PostBlog />
              </PrivateRoute>
            }
          />

           {/* ✅ ChangePassword Route */}
           <Route
            path="/change-password"
            element={
              <PrivateRoute user={user}>
                <ChangePassword />
              </PrivateRoute>
            }
            />

        </Routes>
      </div>
    </>
  );
}

export default App;
