import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import React from 'react'
import Container from '@mui/material/Container';
import DashboardNavbar from './Navbar'
import Home from './home/Home'
import ProtectedRoute from './ProtectedRoute';
import Board from './Board';
import Info from './Info';

const Dashboard = () => {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)
  const [channels, setChannels] = useState(null)
  const [messages, setMessages] = useState(null)
  const params = useParams()
  const myServersID = params.serverID

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
      const yourServer = await result.filter((server) => {return server.serverID == myServersID})
      
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
      const serversUsers = result.filter((user) => {return user.serverID.includes(myServersID) })
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
    getServers()
    getUsers()
  }, [])

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
      {/* {server && <DashboardNavbar name={server.serverName}/>} */}
      {server && channels && users && <Board server={server} users={users} channels={channels} messages={messages}/>}
    </Container>
  )
}

export default Dashboard