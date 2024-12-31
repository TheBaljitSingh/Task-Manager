import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/login`,
        { email, password },
        { withCredentials: true } // `withCredentials` sends cookies
      );
      
      if (response.status === 200) {
        const { token } = response.data; // Assuming the token is returned in the response
        localStorage.setItem('authToken', token); // Store the token in localStorage
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to dashboard
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (

<>
<Navbar/>
    <div className=" mt-12  flex justify-center bg-white-200">
      <form onSubmit={handleLogin} className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@gmail.com"
          className="w-full mb-3 p-2 border rounded"
          required
          />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="test@12345678"
          className="w-full mb-3 p-2 border rounded"
          required
          />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
          >
          Log In
        </button>
        <div>

Don't have account?
<a href="/signup" className='text-blue-600 hover:text-blue-500'> signup</a>
</div>
      </form>
      
    </div>
          </>
  );
};

export default LoginPage;
