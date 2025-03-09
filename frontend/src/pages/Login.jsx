import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);

      // Redirect based on role
      if (user.role === 'police') {
        navigate('/dashboard/police');
      } else if (user.role === 'hotelOwner') {
        navigate('/dashboard/hotel');
      } else {
        navigate('/login'); // Fallback case
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
