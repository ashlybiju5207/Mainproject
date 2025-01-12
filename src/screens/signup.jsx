import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    const allowedEmail = 'kseb@example.com'; // Replace with the allowed email ID
    const allowedPassword = 'kseb123'; // Replace with the allowed password

    if (email === allowedEmail && password === allowedPassword) {
      // Redirect to the login page or another page
      window.location.href = '/login';
    } else {
      alert('Cannot create account. Unauthorized email or password.');
    }
  };

  return (
    <div className="signup">
      <form className="form" onSubmit={handleSignup}>
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
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <input className="submit" type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default Signup;