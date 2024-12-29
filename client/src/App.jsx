import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/SignupPage.jsx';


const App = () => {
  // Replace this with your actual authentication logic

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  // console.log(localStorage.getItem('authToken'));

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<RedirectToDashboard isAuthenticated={isAuthenticated} />}
        />



        {/* Public Routes */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}  />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}  />} />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Handle Not Found Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};


const RedirectToDashboard = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      navigate("/login"); // Redirect to login
    }
  }, [isAuthenticated, navigate]);

  return null; // This component doesn't render any UI
};

export default App;
