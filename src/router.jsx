import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Land from './screens/land';
import Dashboard from './screens/dashboard';
import Payments from './screens/payments';
import Reports from './screens/reports';
import AboutUs from './screens/Aboutus';
import Login from './screens/login';
import Signup from './screens/signup';
import './App.css';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
    </Routes>
  </Router>
);

export default AppRouter;