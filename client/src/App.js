import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard'
import DashboardNavbar from './components/Navbar'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  const [authorised, setAuthorised] = useState(true)
  const navigate = useNavigate()
  const handleAuth = (authed) => {
    setAuthorised(authed)
    navigate("/:serverID")
  }

  const handleLogout = () => {
    setAuthorised(false)
    navigate("/")
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={
          <Home />
        } />
        <Route path='/:serverID' element= {
          <ProtectedRoute authorised={authorised}>
            <Dashboard/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
