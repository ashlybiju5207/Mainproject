import React, { useState, useEffect } from 'react';
import './Forgotpass.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Forgotpass = () => {
  const [email, setEmail] = useState('');
  const [shake, setShake] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const form = document.querySelector('.form');
    form.classList.add('fade-in');
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Please enter your email.');
      }, 500);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email, {
        url: 'https://metroniq-bdde0.firebaseapp.com',
        handleCodeInApp: true
      });
      alert('Password reset link has been sent to your email.');
      setTimer(60); // Set timer for 60 seconds
    } catch (error) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Error sending password reset email. Please try again.');
      }, 500);
    }
  };

  return (
    <div className="forgotpass">
      <form className={`form ${shake ? 'shake' : ''}`} onSubmit={handleForgotPassword}>
        <h2 className="heading">Forgot Password</h2>
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
        <input
          className="submit"
          type="submit"
          value={timer > 0 ? `Resend in ${timer}s` : "Send Reset Link"}
          disabled={timer > 0}
        />
      </form>
    </div>
  );
};

export default Forgotpass;