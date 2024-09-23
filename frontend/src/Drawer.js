import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BarChartIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';

import Logo from "./logo.jpg"
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PieChartIcon from '@mui/icons-material/PieChart';
const drawerWidth = 240;
const useStyles = makeStyles({
    drawer: {
      width: "250px"
    }
  });
function ResponsiveDrawer(props) {
    const classes = useStyles();
    const location = useLocation();
   
    const itemsList = [
      {
        path:"/"
      }
      ,
      {
        text: "Dashboard",
        icon: <DashboardOutlinedIcon />,
        path: "/"
      },
      {
        text: "WorkSpace",
        icon: <AppsOutlinedIcon />,
        path: "/pipline"
      },
      {
        text: "Analytics",
        icon: <PieChartIcon />,
        path: "/analystic"
      },
      {
        text: "Admin Portal",
        icon: <AdminPanelSettingsIcon />,
        path: "/admin"
      },
      {
        text: "Alert Management",
        icon: <MailIcon />,
        path: "/alert"
      },
      {
        text: "AHF PowerBI",
        icon: <BarChartIcon />,
        path: "/powerbi"
      },
      // CommentIcon
      {
        text: "CoPilot",
        icon: <CommentIcon />,
        path: "/chat"
      },
      {
        text: "Setting",
        icon: <SettingsIcon />,
        path: "/setting"
      }

    ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.drawer}>
       <img
            src={Logo}
            style={{
              marginTop:"10px",
              width: "250px",
              height: "58px",
              padding: "1px",
              marginRight: "5px",
            }}
            alt="logo"
          />
      {/* <Toolbar /> */}
      <Divider />

            <List>
        {itemsList.map((item, index) => {
          const { text, icon, path } = item;
          return (
            <ListItem
              button
              key={text}
              component={Link}
              to={path}
              selected={location.pathname === path}
            >
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        
      >
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: {sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(10% - 10px)` } }}
      > 
        <Toolbar />
       
      </Box> */}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;


