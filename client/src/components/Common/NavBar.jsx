import React, { useContext } from 'react';
import { AppBar, Container, IconButton, SvgIcon, Toolbar, Typography } from '@material-ui/core';
import { ReactComponent as Logo } from 'assets/images/t-issue.svg';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from 'AuthContext';
import { NavLink } from 'react-router-dom';
import Link from 'components/Common/Link';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 1, // Necessary to appear in front of the sidebar
  },
  icon: {
    position: 'relative',
    bottom: '3px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    flexGrow: 2
  },
  navLinksContainer: {
    justifyContent: 'flex-end',
    margin: 'auto',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [ auth ] = useContext(AuthContext);

  return (
    <AppBar className={classes.appBar} color="primary">
      <Toolbar>
        <Container className={classes.container}>
          <NavLink to="/">
            <IconButton>
              <SvgIcon className={classes.icon}>
                <Logo/>
              </SvgIcon>
            </IconButton>
          </NavLink>
          <Typography className={classes.title} variant="h6" color="textSecondary">
            T-Issue
          </Typography>
        </Container>
        <Container className={`${classes.container} ${classes.navLinksContainer}`}>
          <Link
            name="Dashboard"
            destination="/dashboard"
          />
          { auth.authenticated
            ? <Link
              name="Sign Out"
              destination="/sign-out"
            />
            :
            <>
              <Link
                name="Sign In"
                destination="/sign-in"
              />
              <Link
                name="Register"
                destination="/register"
              />
            </>
          }
        </Container>
      </Toolbar>
    </AppBar>
  );
}
