import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const PrivateRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') && localStorage.getItem('role') === role ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/admin" component={AdminDashboard} role="admin" />
      <PrivateRoute path="/user" component={UserDashboard} role="user" />
    </Router>
  );
};

export default App;
