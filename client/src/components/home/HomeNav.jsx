import React from 'react'
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeNav = () => {
  return (
    <Navbar bg="white" expand="lg" className="navbar">
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
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default HomeNav;