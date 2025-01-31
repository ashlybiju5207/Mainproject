import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Land from './screens/land';
import Dashboard from './screens/Dashboard';
import Payments from './screens/Payments';
import Reports from './screens/reports';
import AboutUs from './screens/Aboutus';
import Login from './screens/login';
import Signup from './screens/signup';
import Forgotpass from './screens/Forgotpass';  
import Products from './screens/products'; // Import the Products component
import FAQ from './screens/faq';
import './App.css';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Land />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpass" element={<Forgotpass />} />
      <Route path="/faq" element={<FAQ />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;