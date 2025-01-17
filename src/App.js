import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import PaymentDashboard from './screens/Payments';
import Reports from './screens/reports';
import AboutUs from './screens/Aboutus';
import Login from './screens/login';
import Signup from './screens/signup';
import Products from './screens/products'; // Import the Products component
import './App.css';
import ForgotPass from './screens/Forgotpass';  
import '@fontsource/dm-sans';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/payments" component={PaymentDashboard} />
        <Route path="/reports" component={Reports} />
        <Route path="/" exact component={Dashboard} />
        <Route path="/aboutus" component={AboutUs} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgotpass" component={ForgotPass} />
        <Route path="/products" component={Products} /> {/* Add the Products route */}
      </Switch>
    </Router>
  );
}

export default App;