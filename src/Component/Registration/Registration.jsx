import React, { useState } from 'react';
import axios from 'axios';
import style from "../Registration/Registration.module.css"
import { useNavigate } from 'react-router-dom'; 
const Registration = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const usenavigate = useNavigate()
  
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
      const response = await axios.post('http://localhost:8000/user/registration/', formData);
      setMessage(response.data.message);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      usenavigate("/home")
    } catch (error) {
      setError(error.response?.data.message || 'Registration failed');
    }
  };

  return (
    <div className={style.container}>
      <h2>Register</h2>
     
      <form  className={style.mainCard} onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"  name="firstname" value={formData.firstname} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastname" value={formData.lastname}  onChange={handleChange}  />
        </div>
        <div>
          <label>Email:</label>
          <input type="email"  name="email" value={formData.email} onChange={handleChange}  />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password" name="password" value={formData.password} onChange={handleChange}  />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Registration;
