import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { useState, useEffect } from 'react';
import './index.css';
import Home from "./pages/Home";
import React from "react";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/FAQ";
import PostBlog from "./pages/PostBlog";

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

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
