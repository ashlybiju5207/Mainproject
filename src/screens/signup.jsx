import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.form');
    form.classList.add('fade-in');
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Please enter both email and password.');
      }, 500);
      return;
    }

    const allowedEmail = 'kseb@example.com'; // Replace with the allowed email ID
    const allowedPassword = 'kseb123'; // Replace with the allowed password

    if (email === allowedEmail && password === allowedPassword) {
      // Redirect to the login page or another page
      window.location.href = '/login';
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Cannot create account. Unauthorized email or password.');
      }, 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup">
      <form className={`form ${shake ? 'shake' : ''}`} onSubmit={handleSignup}>
        <h2 className="heading">Sign up</h2>
        <span className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>
        <span className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </span>
        <input className="submit" type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default Signup;