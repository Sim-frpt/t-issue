import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import SignIn from './components/SignIn';
import NavBar from './components/Common/NavBar';
import Dashboard from './components/Dashboard';
import { AuthContext } from 'AuthContext';

function App() {
  const [ auth, setAuth ] = useContext(AuthContext);

  return (
    <>
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/sign-in" component={SignIn}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/">
            { console.log(auth.authenticated), auth.authenticated ? <Redirect to="/dashboard" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {/*<div className="App">*/}
          {/*{isLoading ? (*/}
            {/*<Spinner/>*/}
          {/*): (*/}
            {/*<SignIn/>*/}
          {/*)}*/}
        {/*</div>*/}
      </Router>
    </>
  );
}

export default App;
