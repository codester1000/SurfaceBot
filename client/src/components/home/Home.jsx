import React from 'react'
import Landing from './Landing';
import Contact from './Contact';
import { Container } from '@mui/material';
import HomeNav from './HomeNav';
import Background from './Background';
import { Box } from '@mui/system';
import InfoArea from './InfoArea';

const Home = () => {
  return (
    <>
    <Box sx={{ zIndex: "-1", width: "100vw", overflowX: "hidden", position: "absolute", minHeight: "120vh", 
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1))"
      }
    }}>
      <Background />
    </Box>
    <Container maxWidth="xl" sx={{position: "relative" }} >
      <HomeNav/>
      <Landing />
      <InfoArea />
      <Contact />
    </Container>
    </>
  )
}

export default Home;