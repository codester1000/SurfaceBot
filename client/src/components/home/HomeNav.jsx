import React from 'react'
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../buttons/LoginButton';
import SignupButton from '../buttons/SignUpButton';
import LogoutButton from '../buttons/LogoutButton';
import { Link as ScrollLink } from 'react-scroll';


const HomeNav = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/server",
      },
      authorizationParams: {
        screen_hint: "login",
      },
    });
  };
  

  return (
    <Navbar expand="lg" className="navbar" style={{ background: 'rgba(255, 255, 255, 0)' }}>
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
          <Nav className='me-auto'>
          <Navbar.Brand href="/"><img className="nav-img logo" src="/SB-L.png" /></Navbar.Brand>
          </Nav>

          <Nav
            className=""
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/features">Features</Nav.Link>
            <ScrollLink
              to="contact-section" // Use the ID of the "Contact" section
              smooth={true} // Enable smooth scrolling
              duration={300} // Set the scroll duration in milliseconds
            >
              <Nav.Link>Contact</Nav.Link>
            </ScrollLink>
            <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            {/* {!isAuthenticated && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
            {isAuthenticated && (
              <>
                <LogoutButton />
              </>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default HomeNav;