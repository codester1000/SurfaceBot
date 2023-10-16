import React from 'react'
import Container from 'react-bootstrap/Container';
import HomeNav from './home/HomeNav';
import Grid from '@mui/material/Grid';
import SideBar from './userPage/SideBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutButton from './buttons/LogoutButton';


const drawerWidth = 75;

const Callback = () => {
    return (
      <Container maxWidth="1500px" width="100%">
        <Grid container direction="row" spacing={0}>
          {/* Sidebar */}
          <Grid item md={0.75}>
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
              <ListItemIcon>
                <IconButton>
                  <PersonIcon color="primary" fontSize="large" />
                </IconButton>
              </ListItemIcon>
            </ListItem>
              <ListItem>
                <LogoutButton />
              </ListItem>
            <ListItem>
              <ListItemIcon>
                <IconButton>
                  <HomeIcon color="primary" fontSize="large" alt="Home"/>
                </IconButton>
              </ListItemIcon>
            </ListItem>
          </List>
        </div>
        <Toolbar />
      </Drawer>
    </Box>          </Grid>
          <Grid item xs={12} md={11.25} height="100%" width="100%">
            <div>
              <h1> </h1>
            </div>
          </Grid>
        </Grid>
      </Container>
    )
  }
export default Callback