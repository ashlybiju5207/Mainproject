import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './screens/dashboard';
import PaymentDashboard from './screens/payments';
import Reports from './screens/reports';
import AboutUs from './screens/Aboutus';
import Login from './screens/login';
import Signup from './screens/signup';
import './App.css';
import Forgotpass from './screens/Forgotpass';  
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
        <Route path="/Forgotpass" component={Forgotpass} />

      </Switch>
    </Router>
  );
}

export default App;