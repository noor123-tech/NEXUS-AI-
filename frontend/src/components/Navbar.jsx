import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = ({ user, handleLogout }) => {
  const randomColor = () => {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-pink-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">Nexus AI</div>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-sky-400 transition">Home</Link>
        <Link to="/contact-us" className="hover:text-sky-400 transition">Contact Us</Link>
        <Link to="/faq" className="hover:text-sky-400 transition">FAQ</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-sky-400 transition">Dashboard</Link>
            <Link to="/post-blog" className="hover:text-sky-400 transition">Post Blog</Link>
            <div className="flex items-center gap-3">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover bg-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/40';
                  }}
                />
              ) : (
                <div className={`w-10 h-10 rounded-full ${randomColor()}`}></div>
              )}
              <span className="text-sm font-medium">{user.name}</span>
            </div>

        
            <Link to="/change-password">Change Password</Link> {/* ✅ Add this */}

            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>

          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;