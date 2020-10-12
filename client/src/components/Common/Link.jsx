import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link as MuiLink } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  link: {
    padding: '0.5em',
  }
});

export default function Link(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <MuiLink
      className={classes.link}
      component={NavLink}
      to={props.destination}
      color="textSecondary"
      underline="hover"
      variant="button"
      activeStyle={{
        color: theme.palette.secondary.dark,
      }}
    >
      {props.name}
    </MuiLink>
  );

}
