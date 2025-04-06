import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', form);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token); // ✅ THIS updates nav immediately
      navigate('/food');
    } catch (err) {
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
  
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
  
        {error && <p className="auth-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );  
};

export default Login;
