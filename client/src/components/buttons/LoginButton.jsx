import { useAuth0 } from "@auth0/auth0-react";
import React from 'react'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';  


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/server",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <IconButton color="primary" onClick={handleLogin}>
      <LoginIcon fontSize="large" />
    </IconButton> 

  )
}

export default LoginButton


