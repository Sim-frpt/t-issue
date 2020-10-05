import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';
import NavBar from './components/Common/NavBar';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/helpers/PrivateRoute';

function App() {
  return (
    <>
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/sign-in" component={SignIn}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/">
            <Redirect to="/dashboard"/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
