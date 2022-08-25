import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/Container';

const Dashboard = () => {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)

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
      
      setServer(result[0])
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
      setUsers(result)
      
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
      <DashboardNavbar />
      {server && <Board server={server} users={users}/>}
    </Container>
  )
}

export default Dashboard