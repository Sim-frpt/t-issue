import React from 'react';
import { AppBar, IconButton, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/images/t-issue.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.light,
  },
  icon: {
    position: 'relative',
    bottom: '3px',
  }
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="primary">
      <Toolbar>
        <IconButton>
          <SvgIcon className={classes.icon}>
            <Logo/>
          </SvgIcon>
        </IconButton>
        <Typography variant="h6" color="textSecondary">
          T-Issue
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
