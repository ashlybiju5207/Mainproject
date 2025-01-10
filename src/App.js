import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './screens/dashboard';
import PaymentDashboard from './screens/payments';
import Reports from './screens/reports';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/payments" component={PaymentDashboard} />
        <Route path="/reports" component={Reports} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;