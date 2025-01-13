import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.form');
    form.classList.add('fade-in');
  }, []);

  const handleLogin = (e) => {
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
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Unauthorized access. Invalid username or password.');
      }, 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <form className={`form ${shake ? 'shake' : ''}`} onSubmit={handleLogin}>
        <h2 className="heading">Log in</h2>
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
        <span className="span"><Link to="/Forgotpass">Forgot password?</Link></span>
        <span className="span"></span>
        <input className="submit" type="submit" value="Log in" />
        <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
      </form>
    </div>
  );
};

export default Login;