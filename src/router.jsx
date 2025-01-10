import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Land from './screens/land';
import Dashboard from './screens/dashboard';
import Payments from './screens/payments';
import Reports from './screens/reports';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  </Router>
);

export default AppRouter;