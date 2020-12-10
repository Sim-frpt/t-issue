import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import NavBar from './components/Common/NavBar';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/helpers/PrivateRoute';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  offset: {
    ...theme.mixins.toolbar,
    margin: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <>
      <Router>
        <NavBar/>
        {/* This div is necessary for the navbar to be fixed and not cover up the content below */}
        <div className={classes.offset}/>
        <Switch>
          <Route exact path="/sign-in" component={SignIn}/>
          <Route exact path="/sign-out" component={SignOut}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <Route exact path="/">
            <Redirect to="/dashboard"/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
