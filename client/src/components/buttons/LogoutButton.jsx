import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'

const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

  return (
    <IconButton color="primary" onClick={handleLogout}>
      <LogoutIcon fontSize="large" />
    </IconButton> 
  )
}

export default LogoutButton


