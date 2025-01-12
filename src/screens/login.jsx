import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const allowedEmail = 'kseb@example.com'; // Replace with the allowed email ID
    const allowedPassword = 'kseb123'; // Replace with the allowed password

    if (email === allowedEmail && password === allowedPassword) {
      // Redirect to the dashboard or another page
      window.location.href = '/dashboard';
    } else {
      alert('Unauthorized access. Invalid username or password.');
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleLogin}>
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
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span className="span"><a href="#">Forgot password?</a></span>
        <input className="submit" type="submit" value="Log in" />
        <span className="span">Don't have an account? <Link to="/signup">Sign up</Link></span>
      </form>
    </div>
  );
};

export default Login;