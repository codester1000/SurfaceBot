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
import SideBar from './userPage/SideBar'
import Grid from '@mui/material/Grid';



const Dashboard = () => {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)
  const [channels, setChannels] = useState(null)
  const [messages, setMessages] = useState(null)
  const [token, setToken] = useState('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InlCc0V0bkRDOTdJWVJsUnZXQ09EMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1qczhmdHBteHZ6M3AyOHFwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJRWGE1SnJ1VE9EVURnSHYza1JlOXZnTXdHVlM1T05TbkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtanM4ZnRwbXh2ejNwMjhxcC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5NDQwMjg2NCwiZXhwIjoxNjk0NDg5MjY0LCJhenAiOiJRWGE1SnJ1VE9EVURnSHYza1JlOXZnTXdHVlM1T05TbiIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV9jb25maWcgdXBkYXRlOnNjaW1fY29uZmlnIGRlbGV0ZTpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV90b2tlbiByZWFkOnNjaW1fdG9rZW4gZGVsZXRlOnNjaW1fdG9rZW4gcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.a4FZ85PCjfVlUiJAxp0Sso2HkYGSE7MmKpszUJrziGZUzU_XGdJhHd5-jpsQBRCqxlzSDbQjMKRHgwx316j_brcUJNb3pHwxiQ0Wd-zB9cruXhsBXenohPcWQrZRoCJEtqkyCeHCUjf2chs-LNh4LALNMwRrA4BjkFi2zSDjg20mS68rzpZbwLGet-nqF4U1XeVzLvNXiWg6URCzGl2cvCXuXczNVoh228JuFAkQrAvdYFiqQdMmvNJ5ryIFWUMiqwYxxqs3KtrWWJq3LN1SXgzdxh2TadIsCANDepXsFTNRg0awyNeA_HYWrZzotxxWQFTAbJC_ApuVI9LBa_kziw')

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientSecret = process.env.REACT_APP_AUTH0_API_CLIENT_SECRET;
  
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0(); // Get Auth0 user and access token
  const [app_metadata, setAppMetadata] = useState("");


  
  const getAppMetadata = async () => {
    if (!user) {
        console.log("no user")
        return;
    }
    try {
      
      
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev-js8ftpmxvz3p28qp.us.auth0.com/api/v2/users/${user.sub}`,
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${token}`, 
        }
      }

      axios.request(config)
      .then((response) => {
        setAppMetadata(response.data.app_metadata.server)
        console.log(app_metadata)
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
  }, [user, getAccessTokenSilently, isAuthenticated, app_metadata]);

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
          {server && channels && users && isAuthenticated && <Board server={server} users={users} channels={channels} messages={messages}/>}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard