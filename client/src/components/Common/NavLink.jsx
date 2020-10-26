import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  link: {
    padding: '0.5em',
  }
});

export default function NavLink(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Link
      className={classes.link}
      component={RouterNavLink}
      to={props.destination}
      color="textSecondary"
      underline="hover"
      variant="button"
      activeStyle={{
        color: theme.palette.secondary.dark,
      }}
    >
      {props.name}
    </Link>
  );

}
