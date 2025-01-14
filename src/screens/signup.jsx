import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './signup.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shake, setShake] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Please fill in all fields.');
      }, 500);
      return;
    }

    if (password !== confirmPassword) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Passwords do not match.');
      }, 500);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to the login page or another page
      window.location.href = '/login';
    } catch (error) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Error signing up. Please try again.');
      }, 500);
    }
  };

  return (
    <div className="signup">
      <form className={`form ${shake ? 'shake' : ''}`} onSubmit={handleSignUp}>
        <h2 className="heading">Sign Up</h2>
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
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
        <input className="submit" type="submit" value="Sign Up" />
        <span className="span">Already have an account? <Link to="/login">Log in</Link></span>
      </form>
    </div>
  );
};

export default SignUp;