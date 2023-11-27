import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import React from 'react'
import Container from '@mui/material/Container';
import DashboardNavbar from './Navbar'
import Home from './home/Home'
import ProtectedRoute from './ProtectedRoute';
import Board from './Board';
import Info from './home/Info';
import SideBar from './SideBar'
import Grid from '@mui/material/Grid';
import Dash from './Dash';
import { Box, CircularProgress } from '@mui/material';


const Dashboard = () => {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)
  const [channels, setChannels] = useState(null)
  const [messages, setMessages] = useState(null)
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientSecret = process.env.REACT_APP_AUTH0_API_CLIENT_SECRET;
  
  const { user, isLoading, isAuthenticated } = useAuth0(); // Get Auth0 user and access token
  const [app_metadata, setAppMetadata] = useState("");


  
  const getAppMetadata = async () => {
    if (!user) {
        console.log("no user")
        return;
    }
    try {

      // const dataToken = {
      //   client_id: '71P4Das08oajvWyvSTgtDLwpJ5YyE0mR',
      //   client_secret: 'n9JafHbQSlrJ6MtCzxViZaw5NPEdZyN2aO6DfIxD_K1hWtRtUxO1zx-ZlkeC4k8G',
      //   audience: 'https://dev-js8ftpmxvz3p28qp.us.auth0.com/api/v2/',
      //   grant_type: 'client_credentials',
      // };
      
      // const configToken = {
      //   method: 'POST',
      //   url: 'https://dev-js8ftpmxvz3p28qp.us.auth0.com/oauth/token',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: dataToken,
      // };
      
      // axios(configToken)
      //   .then(function (response) {
      //     console.log(response.data);
      //   })
      //   .catch(function (error) {
      //     console.error(error);
      //   });

 
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev-js8ftpmxvz3p28qp.us.auth0.com/api/v2/users/${user.sub}`,
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${process.env.REACT_APP_AUTH0_MANAGEMENT_TOKEN}`, 
        }
      }

      axios.request(config)
      .then((response) => {
        setAppMetadata(response.data.app_metadata.server)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with an error status code
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          // Something else happened while setting up the request or handling the response
          console.error("Request error:", error.message);
        }
        
      });
    } catch (e) {
        console.log(e.message);
    }
};
  const getMessages = async (serverMessagesIDs) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      
      const serversMessages = result.filter((message) => {return serverMessagesIDs.includes(message.messageID) })
      setMessages(serversMessages)

    } catch (err) {
      console.log(err);
    }
  }

  const getServers = async () => {
    // this may be a security risk but for now its going to have to do
    try {
      const response = await fetch('http://localhost:3000/servers', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      // this needs to be changed when searching
      const yourServer = await result.filter((server) => {return server.serverID == app_metadata})
      
      setServer(yourServer[0])
      getChannels(yourServer[0])
      getMessages(yourServer[0].messages)

    } catch (err) {
      console.log(err);
    }
  
  }

  const getUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      const serversUsers = result.filter((user) => {return user.serverID.includes(app_metadata) })
      setUsers(serversUsers)
      
    } catch (err) {
      console.log(err);
    }
  }
  const getChannels = async (serverData) => {
    try {
      const response = await fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      const serverChannelsList = serverData.channels
      const serversChannels = result.filter(
        (channel) => { 
          if(serverChannelsList.indexOf(channel.channelID))  {
            return channel
          }
      })
      setChannels(serversChannels)      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // fixTokens()
    if (app_metadata.length > 0) {
      getUsers()
      getServers()
    }
    // if (token.length > 0) {
      getAppMetadata()
    // }
  }, [user, isAuthenticated, app_metadata]);

  const handleChannels = async (updatedServer, serverID) => {
    await fetch(`/cards/${serverID}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(updatedServer)
    })
  }
  


  return (
    <Container maxWidth="1500px" width="100%">
      <Grid container direction="row" spacing={0}>
        {/* Sidebar */}
        <Grid item md={0.75}>
          <SideBar /> {/* Include the Sidebar component here */}
        </Grid>
        <Grid item xs={12} md={11.25} height="100%" width="100%">
          {isLoading && (
            <Box 
              maxWidth="xl"
              height="100vh"
              display="flex"
              justifyContent="center"
              marginY="auto"
              alignItems="center"
            >
              <CircularProgress size={80}/>
            </Box>
            )}
          {server && channels && users && isAuthenticated && <Dash server={server} users={users} channels={channels} messages={messages}/>}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard