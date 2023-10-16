import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignUpButton';
import LogoutButton from '../buttons/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import Tooltip from '@mui/material/Tooltip';


const drawerWidth = 75;

function SideBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // Spread items vertically
            height: '100%', // Make the drawer full height
            borderRight: 'none',
          },
        }}
        variant="permanent"
      >
        <Box sx={{justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <img className="nav-img logo" src="/SB-L.png" alt='SB Logo'/>
        </Box>
        <div>
          <List sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {/* Icons */}
            <ListItem>
              <Tooltip title="Surface Profile" placement="right">
                <ListItemIcon>
                  <IconButton>
                    <PersonIcon color="primary" fontSize="large" />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
            </ListItem>
            {!isAuthenticated && (
              <>
              <ListItem>
                <Tooltip title="Login" placement="right">
                  <ListItemIcon>
                    <LoginButton/>
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
              </>
            )} 
            {isAuthenticated && (
              <ListItem>
                <Tooltip title="Logout" placement="right">
                  <ListItemIcon>
                    <LogoutButton />
                  </ListItemIcon>
                </Tooltip>
              </ListItem>
            )}
            <ListItem>
              <Tooltip title="Home" placement="right">
                <ListItemIcon>
                  <IconButton>
                    <HomeIcon color="primary" fontSize="large" />
                  </IconButton>
                </ListItemIcon>
              </Tooltip>
            </ListItem>
          </List>
        </div>
        <Toolbar />
      </Drawer>
    </Box>
  );
}

export default SideBar;
