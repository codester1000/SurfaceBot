import React from 'react'
import { Box } from '@mui/material';

const Background = () => {
  return (
  <>
    <Box
    sx={{
      backgroundImage: "url('BGImages/SBLWhite.svg')",
      zIndex: "-1", // Set a negative zIndex for the background image
      height: "400px",
      width: "400px",
      position: "absolute", 
      top: "20vh", // Position the image at the bottom
      right: "20vh",
      opacity: "0.3", 
    }}
    >
    </Box>
    <Box
    sx={{
      backgroundImage: "url('BGImages/MT.svg')",
      zIndex: "-2", // Set a negative zIndex for the background image
      height: "1000px",
      width: "1000px",
      position: "absolute", 
      top: "-100px", // Position the image at the bottom
      right: 0, 
      opacity: "0.8",
    }}
    >
    </Box>
    <Box
    sx={{
      backgroundImage: "url('BGImages/TR.svg')",
      zIndex: "-3", // Set a negative zIndex for the background image
      height: "900px",
      width: "900px",
      position: "absolute", 
      top: "-100px", // Position the image at the bottom
      right: "-50px",
      opacity: "0.8", 
    }}
    ></Box>
    <Box
    sx={{
      backgroundImage: "url('BGImages/BL.svg')",
      zIndex: "-4", // Set a negative zIndex for the background image
      height: "900px",
      width: "900px",
      position: "absolute", 
      bottom: "-100px", // Position the image at the bottom
      left: "-100px", 
      opacity: "0.8", 
    }}
    >
    </Box>
    <Box
    sx={{
      backgroundImage: "url('BGImages/MB.svg')",
      zIndex: "-5", // Set a negative zIndex for the background image
      height: "1200px",
      width: "1200px",
      position: "absolute", 
      bottom: "-500px", // Position the image at the bottom
      right: "-100px",
      opacity: "0.8", 
    }}
    ></Box>
  </>
  )
}

export default Background