import React, { useState } from 'react';
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSignup}>
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
              onChange={(e) => setPassword(e.target.value)}
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