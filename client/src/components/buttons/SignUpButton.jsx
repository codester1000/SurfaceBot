import { useAuth0 } from "@auth0/auth0-react";
import IconButton from '@mui/material/IconButton';
import React from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const SignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleSignUp = async () => {
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
    <IconButton color="primary" onClick={handleSignUp}>
      <AppRegistrationIcon fontSize="large" />
    </IconButton> 
  )
}

export default SignupButton


