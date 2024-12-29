import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Signup = ({setIsAuthenticated}) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request using axios
      const response = await axios.post( `${import.meta.env.VITE_BACKEND}/api/v1/register`, user);

      // Check if the registration was successful
      if (response.status === 201) {
        // Store the token in localStorage
        const { token } = response.data; // Assuming the token is returned in the response
        localStorage.setItem('authToken', token); // Store the token in localStorage
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 400) {
            // Handle "user already exists" error
            setError(err.response.data.message); 
          } else {
            // Handle other errors (e.g., server errors)
            setError(`An error occurred while registering. ${ err}`);
          }
    }
  };

  console.log("sign up page");

  return (
    <>
    <Navbar/>
    <div className="w-full max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
        </p>
      </div>
    </div>
            </>
  );
};

export default Signup;
