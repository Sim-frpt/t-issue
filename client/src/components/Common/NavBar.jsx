import React, { useContext, useState } from 'react';
import {
  AppBar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Toolbar,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { ReactComponent as Logo } from 'assets/images/t-issue.svg';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AuthContext } from 'AuthContext';
import { NavLink as RouterNavLink } from 'react-router-dom';
import NavLink from 'components/Common/NavLink';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.light,
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
    flexShrink: 2,
    [theme.breakpoints.down('xs')]: {
      flexShrink: 1
    }
  },
  navLinksContainer: {
    justifyContent: 'flex-end',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      flexShrink: 2
    }
  },
}));

function NavBar(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { history } = props;
  const [ auth ] = useContext(AuthContext);
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = anchorEl ? true : false;
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  return (
    <AppBar className={classes.appBar} color="primary">
      <Toolbar>
        <Container className={`${classes.container} ${classes.logoContainer}`}>
          <RouterNavLink to="/">
            <IconButton>
              <SvgIcon className={classes.icon}>
                <Logo/>
              </SvgIcon>
            </IconButton>
          </RouterNavLink>
          <Typography className={classes.title} variant="h6" color="textSecondary">
            T-Issue
          </Typography>
        </Container>
        <Container className={`${classes.container} ${classes.navLinksContainer}`}>
          {isMobile ?
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {getMenuItems(auth.authenticated, handleMenuClick)}
              </Menu>
            </>
            :
              getNavLinks(auth)
          }
        </Container>
      </Toolbar>
    </AppBar>
  );
}

function getNavLinks(auth) {
  const dashboardLink = <NavLink
    name="Dashboard"
    destination="/dashboard"
  />;

  return (
    <>
      {dashboardLink}
      {auth.authenticated
        ?
          <>
            <NavLink
              name="Sign Out"
              destination="/sign-out"
            />
          </>
          :
          <>
            <NavLink
              name="Sign In"
              destination="/sign-in"
            />
            <NavLink
              name="Register"
              destination="/register"
            />
          </>
      }
    </>
  )
}

function getMenuItems(isAuthenticated, handleMenuClick) {
  const dashboardItem =
    <MenuItem
      onClick={() => handleMenuClick('/dashboard')}
    >
      Dashboard
    </MenuItem>;

  return(
    <div>
      {dashboardItem}
      {isAuthenticated
        ?
          <MenuItem
            onClick={() => handleMenuClick('/sign-out')}
          >
            Sign Out
          </MenuItem>
          :
          <>
            <MenuItem
              onClick={() => handleMenuClick('/sign-in')}
            >
              Sign In
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClick('/register')}
            >
              Register
            </MenuItem>
          </>
      }
    </div>
  );
}

export default withRouter(NavBar);
