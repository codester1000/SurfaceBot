import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import React from 'react'
import Container from 'react-bootstrap/Container';
import DashboardNavbar from './Navbar'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute';
import Board from './Board';

const Dashboard = () => {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)
  const params = useParams()
  const myServersID = params.serverID

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
      const serversUsers = result.filter((user) => {return user.serverID == myServersID })
      setUsers(serversUsers)
      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getServers()
    getUsers()
  }, [])
  return (
    <Container>
      {server && <DashboardNavbar name={server.serverName}/>}
      {server && <Board server={server} users={users}/>}
    </Container>
  )
}

export default Dashboard