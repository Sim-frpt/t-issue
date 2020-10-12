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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    //[theme.breakpoints.up('sm')]: {
      //display: 'none',
    //},
  },
  // necessary for content to be below app bar
  offset: {
    margin: theme.spacing(2),
    ...theme.mixins.toolbar
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
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
    </div>
  );

  //const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Hidden smUp implementation="css">
      <Container className={classes.offset}>
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
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
	<Drawer
	  //container={container}
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
      <Hidden xsDown implementation="css">
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
