import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkYXqZSYCZq1N6pzr60GWkG5nS3f_EELA",
  authDomain: "metroniq-bdde0.firebaseapp.com",
  projectId: "metroniq-bdde0",
  storageBucket: "metroniq-bdde0.firebasestorage.app",
  messagingSenderId: "765262722554",
  appId: "1:765262722554:web:613754030c0bbbc52fe043",
  measurementId: "G-6JKPXTKRP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.form');
    form.classList.add('fade-in');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Please enter both email and password.');
      }, 500);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } catch (error) {
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