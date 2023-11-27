import React from 'react'
import { Stack, Box, Typography, Grid, Container, Input, InputLabel, FormControl, InputAdornment, TextField, Button } from '@mui/material';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AddModeratorTwoToneIcon from '@mui/icons-material/AddModeratorTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import AutoGraphTwoToneIcon from '@mui/icons-material/AutoGraphTwoTone';

const InfoArea = () => {
  return (
    <>
      <Stack marginX={12} marginTop={12} marginBottom={12} textAlign="center">
        <Typography variant="h3" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>What can <span style={{color: "#5dab3e", fontWeight: "800"}}>SurfaceBot</span>  do?</Typography>
        <Grid container spacing={4} marginTop={4}>
          <Grid item xs={12} md={4}>
            <Stack spacing={2} alignItems="center">
              <AddModeratorTwoToneIcon color="darkerMain" fontSize='large'/>
              <Typography variant="h5" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>Moderate your community</Typography>
              <Typography variant="p" fontSize="14px" fontFamily="'PT Sans Caption', sans-serif" color="primary">
                No need to worry about your community being overrun by trolls. SurfaceBot will automatically report any harmful messages and allow you to decide what to do with them. Easily find the messages to use as evidence for your decision.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2} alignItems="center">
              <SupervisedUserCircleTwoToneIcon color="darkerMain" fontSize='large'/>
              <Typography variant="h5" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>Find your performers</Typography>
              <Typography variant="p" fontSize="14px" fontFamily="'PT Sans Caption', sans-serif" color="primary">
                Use our algorithms to analyse your members interactions and find the ones that are most active and helpful. Easily view the carefully curated data to find your undervalued users.
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2} alignItems="center">
              <AutoGraphTwoToneIcon color="darkerMain" fontSize='large'/>
              <Typography variant="h5" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>View the impact of your actions</Typography>
              <Typography variant="p" fontSize="14px" fontFamily="'PT Sans Caption', sans-serif" color="primary">
                Easily analyse key data to see the impact of your actions on your community. After the implemenation of key changes, you can see how your community has changed and how your actions have affected it.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </>
  )
}

export default InfoArea