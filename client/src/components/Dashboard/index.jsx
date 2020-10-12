import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import Sidebar from './Sidebar';

export default function Dashboard() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={5}>
          <Sidebar/>
        </Grid>
        <Grid item xs={8} sm={7}>
          <Typography>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
