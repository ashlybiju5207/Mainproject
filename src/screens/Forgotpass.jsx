import React, { useState, useEffect } from 'react';
import './Forgotpass.css';

const Forgotpass = () => {
  const [email, setEmail] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.form');
    form.classList.add('fade-in');
  }, []);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Please enter your email.');
      }, 500);
      return;
    }

    const allowedEmail = 'kseb@example.com'; // Replace with the allowed email ID

    if (email !== allowedEmail) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        alert('Unauthorized email. Please enter the correct email.');
      }, 500);
      return;
    }

    // Handle forgot password logic here
    alert('Password reset link has been sent to your email.');
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
        <input className="submit" type="submit" value="Send Reset Link" />
      </form>
    </div>
  );
};

export default Forgotpass;