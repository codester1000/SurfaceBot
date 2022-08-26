import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/Container';
import HomeNav from './HomeNav';
import '../Home.css'

const Home = () => {
  return (
    <Container className='home'>
      <HomeNav />
      <div className="cover px-3">
        <h1>SurfaceBot</h1>
        <p className="lead">Surfacing top contributors faster</p>
        <p></p>
      </div>
    </Container>
  )
}

export default Home;