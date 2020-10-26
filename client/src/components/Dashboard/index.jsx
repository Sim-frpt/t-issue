import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';
import Projects from './Projects';
import Overview from './Overview';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

export default function Dashboard() {
  const { path, url } = useRouteMatch();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={5}>
          <Sidebar {...{url}}/>
        </Grid>
        <Grid item xs={8} sm={7}>
          <Switch>
            <Route exact path={path}>
              <Redirect to={`${path}/overview`} />
            </Route>
            <Route exact path={`${path}/projects`} component={Projects}/>
            <Route exact path={`${path}/overview`} component={Overview}/>
          </Switch>
          <Typography>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
