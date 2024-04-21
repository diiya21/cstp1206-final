import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // Ensure the path matches where your CSS file is located relative to this file
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate=useNavigate()

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', { username, email, password });
      alert('Signup successful PLz login now');
    } catch (error) {
      alert('Failed to signup');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
        <a onClick={() => Navigate('/login')}>login</a>
      </form>
    </div>
  );
}

export default Signup;
