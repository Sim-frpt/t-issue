import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import Projects from './Projects';
import Overview from './Overview';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import { AuthContext } from 'AuthContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const [ auth ] = useContext(AuthContext);

  return (
    <>
      <div className={classes.root}>
        <div>
          <Sidebar {...{url} }/>
        </div>
        <div className={classes.content}>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/overview`} />
            </Route>
            <Route exact path={`${path}/projects`} component={Projects}/>
            <Route
              exact
              path={`${path}/overview`}
              render={(props) => (
                <Overview {...props} auth={auth}/>
              )}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
