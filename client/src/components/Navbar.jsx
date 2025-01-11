import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // User is authenticated
    }
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false); // User is logged out
      navigate('/login');
    } else {
      // Implement login functionality (e.g., open a login modal or redirect to login page)
      setIsLoggedIn(true); // For demonstration purposes, assume login was successful
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="text-white font-semibold text-xl flex space-x-6">
          <span ><a href="/">Home</a></span>
          <span>TaskMap</span>
          <span ><a href="/lobby">Lobby</a></span>

        </div>

        {/* Right Side - Login/Logout Button */}
        <div>
          {
            isLoggedIn &&
            <button
            onClick={handleLoginLogout}
            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
            >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
