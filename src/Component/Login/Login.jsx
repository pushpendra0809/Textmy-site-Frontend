import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from "../Login/Login.module.css"

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8000/user/login/', formData);
      setMessage(response.data.message);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate( '/home');
      }
    } catch (error) {
      setError(error.response?.data.message || 'Login failed');
    }
  };

  return (
    <div className={style.container}>
      <h2>Login</h2>
      <form   className={style.mainCard} onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email"
            name="email" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"  name="password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default Login;
