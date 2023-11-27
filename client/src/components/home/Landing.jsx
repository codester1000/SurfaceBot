import { useState, useEffect } from 'react'
import React from 'react'
import HomeNav from './HomeNav';
import '../../Home.css'
import { Stack, Box, Typography, Grid, Container } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import ForumIcon from '@mui/icons-material/Forum';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import Contact from './Contact';
import Background from './Background';
const Landing = () => {
  return (
    <Stack direction="column" marginX={12} marginTop={8} spacing={8} >
      <Box>
        <Typography variant="h1" fontSize={90} fontWeight="100" fontFamily="'PT Sans Caption', sans-serif" color="#3C4142"><span style={{color: "#5dab3e", fontWeight: "800"}}>Surface</span> your<br/>best community</Typography>
      </Box>
      {/* <Stack direction="row" spacing={8}>
        <Box bgcolor="#3C4142" width={100} height={100} borderRadius="100%">
          
        </Box> */}
        <Typography fontFamily="'PT Sans Caption', sans-serif" sx={{lineHeight: 2}} color="#3C4142" paddingLeft={8}>
          Enhance your community by tapping into valuable
          <br/>
          insights from your data. Build a thriving community
          <br/>
          by identifying your most engaged contributors.
        </Typography>
      {/* </Stack> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Stack>
            <TimelineIcon sx={{fontSize: 50}}/> 
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={24} fontWeight="800">
              Analyze
            </Typography>
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={12}>
              Analyze your communities performance in a new and innovative way. The sentiment and engagement of your community is now at your fingertips.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack>
            <TroubleshootIcon sx={{fontSize: 50}}/> 
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={24} fontWeight="800">
              Discover
            </Typography>
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={12}>
              Uncover individuals who are actively engaging with your product and discern those whose actions may be impeding on the positivity of the community.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack>
            <ForumIcon sx={{fontSize: 50}}/> 
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={24} fontWeight="800">
              Communicate
            </Typography>
            <Typography fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" fontSize={12}>
              Let's make our community even better by building stronger connections with those users who are really into our product, together, we'll make the experience even more awesome! 
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default Landing;