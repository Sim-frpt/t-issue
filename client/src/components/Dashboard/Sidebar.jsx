import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    },
  },
  iconContainer: {
    textAlign: 'center',
    padding: theme.spacing(3)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  offset: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <div className={classes.offset} />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );

  return (
    <>
      <Hidden smUp>
	<Container className={classes.iconContainer}>
	  <IconButton
	    color="inherit"
	    aria-label="open drawer"
	    edge="start"
	    onClick={handleDrawerToggle}
	    className={classes.menuButton}
	  >
	    <MenuIcon
	      fontSize="large"
	      color="primary"
	    />
	  </IconButton>
	</Container>
      </Hidden>
      <nav className={classes.drawer} aria-label="mailbox folders">
	<Hidden smUp>
	  <Drawer
	    variant="temporary"
	    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
	    open={mobileOpen}
	    onClose={handleDrawerToggle}
	    classes={{
	      paper: classes.drawerPaper,
	    }}
	    ModalProps={{
	      keepMounted: true, // Better open performance on mobile.
	    }}
	  >
	    {drawer}
	  </Drawer>
	</Hidden>
	<Hidden xsDown>
	  <Drawer
	    classes={{
	      paper: classes.drawerPaper,
	    }}
	    variant="permanent"
	    open
	  >
	    {drawer}
	  </Drawer>
	</Hidden>
      </nav>
    </>
  );
}
