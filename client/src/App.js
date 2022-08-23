import { useState, useEffect } from 'react'

import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Board'
import DashboardNavbar from './components/Navbar'
import './App.css';



function App() {
  const [server, setServer] = useState(null)
  const [users, setUsers] = useState(null)

  const getServers = async () => {
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
  
    // const url = 'https://localhost:3000/servers'
    // const res = await fetch(url)
    // const serverData = await res.json()
    // console.log(serverData)
    // setServer(serverData)
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
    <div>
      {/* <Routes> */}
        {/* <Route path='/' element= { */}
          <div>
            <DashboardNavbar />
            {users && <Dashboard server={server} users={users}/>}
          </div>
        {/* }/> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
