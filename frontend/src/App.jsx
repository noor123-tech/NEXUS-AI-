import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import { useState, useEffect } from 'react';
import './index.css';

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
          <Route path="/" element={<Home user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

const Home = ({ user }) => (
  <div>
    <h1>Welcome to Nexus AI</h1>
    <p>{user ? `${user.message}` : "You are not logged in."}</p>
  </div>
);

export default App;
