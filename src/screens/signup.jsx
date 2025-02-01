import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { auth } from '../firebaseConfig'; // Import auth from the new Firebase config file
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      alert('Please fill out all fields.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      alert('Please enter a valid email address.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      alert('Passwords do not match.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
      alert(error.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 6) {
      setError('');
    }
  };

  return (
    <div className={`signup ${isVisible ? 'visible' : ''}`}>
      <form className={`form ${shake ? 'shake' : ''}`} onSubmit={handleSignup}>
        <h2 className="heading">Sign up</h2>
        {error && <p className="error">{error}</p>}
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
              onChange={handlePasswordChange}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </span>
        <span className="input-span">
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </span>
        <input className="submit" type="submit" value="Sign up" />
        <span className="span">Already have an account? <Link to="/login">Log in</Link></span>
      </form>
    </div>
  );
};

export default Signup;