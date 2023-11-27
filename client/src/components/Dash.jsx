import React from 'react';
import Grid from '@mui/material/Grid';
import TopCards from './cards/TopCards';
import TopChart from './userPage/TopChart';
import BrTable from './cards/BrTable';
import { Box, Typography, Card, CardContent, Container, Stack, Link } from '@mui/material';
import Flags from './cards/Flags';
import Info from './home/Info';
import { useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import EmojiFlagsTwoToneIcon from '@mui/icons-material/EmojiFlagsTwoTone';
import { UserChart } from './cards/UserChart.tsx';
import  BarChartR  from './cards/BarChartR.jsx';
import ServerHealthCircle from './cards/ServerHealthCircle';
import MyResponsiveLine from './cards/ResponsiveLineGraph.jsx';
import MyResponsiveBar from './cards/BarChartR.jsx';


const Dash = ({ server, users, channels, messages }) => {

  const [totalUsers, setTotalUsers] = useState(null)
  const [totalMessages, setTotalMessages] = useState(null)
  const [totalKarma, setTotalKarma] = useState(null)
  const [flaggedMessages, setFlaggedMessages] = useState([])
  const [totalFlags, setTotalFlags] = useState(null)
  const [serverHealth, setServerHealth] = useState(null)
  const [circleColor, setCircleColor] = useState("#3a4037")
  const [voiceTime, setVoiceTime] = useState(null)


  const calcServerHealth = (karma, messages, users) => {
    try {
      var health = messages * 10
      health = karma/health
      const activeFlags = users.filter((users) => users.flags.length > 0)
      var messageUsers = users.filter((users) => users.numberOfMessages > 0)
      messageUsers = (messageUsers.length / users.length)
      health = (health*0.5) + (messageUsers*0.5)
      health = health - (activeFlags.length / 10)
      health = health*100
      health = health.toString().slice(0, 2)
      if (health < 30) {
        setCircleColor("#8B0000")
      } else if (health < 40) {
        setCircleColor("#C70039")
      } else if (health < 50) {
        setCircleColor("#FF5733")
      } else if (health < 70) {
        setCircleColor("#FFC300")
      } else {
        setCircleColor("#5dab3e")
      }

      return health
    }
    catch (err) {
      console.log(err)
      return "N/A"
    } 
    
  }
  useEffect(() => {
    setTotalUsers(users.length)
    setTotalMessages(server.messagesSent)
    setTotalKarma(server.karma)
    setTotalFlags(server.flaggedMessages.length)
    setFlaggedMessages(server.flaggedMessages)
    const health = calcServerHealth(server.karma, server.messagesSent, users)
    setServerHealth(health)
  }, [])

  return (
    <Box maxWidth="xl" marginX="auto">
      <Stack>
        {/* top info section for cards and server name */}
        <Box height="10vh" paddingTop={1}>
          {/* <Info serverName={server.serverName}/> */}
          <Typography variant="h3" height="100%" fontFamily="'PT Sans Caption', sans-serif" color="#1B3312">
            {server.serverName}
          </Typography>
        </Box>
        <Box height="15vh">
          <Grid container direction="row" spacing={1} height="100%">
            <Grid item md={2.4}>
              <Card sx={{ borderRadius: '12px', height: '100%' }}>
                <CardContent >
                  <Stack
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ flex: 1 }}
                  >
                    <Box width="50%">
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Messages</Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <ChatBubbleOutlineIcon sx={{color: "grey"}}/>
                    </Box>
                  </Stack>                  
                  <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{totalMessages ? (totalMessages) : (0)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2.4}>
              <Card sx={{ borderRadius: '12px', height: '100%' }}>
                <CardContent>
                  <Stack
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ flex: 1 }}
                  >
                    <Box width="50%">
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Voice Time</Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <KeyboardVoiceOutlinedIcon sx={{color: "grey"}}/>
                    </Box>
                  </Stack>  
                  <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{voiceTime ? ("get") : ("00:00:00")}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2.4}>
              <Card sx={{ borderRadius: '12px', height: '100%' }}>
                <CardContent>
                  <Stack
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ flex: 1 }}
                  >
                    <Box width="50%">
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Users</Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <AccountCircleRoundedIcon sx={{color: "grey"}}/>
                    </Box>
                  </Stack>                  
                  <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{totalUsers ? (totalUsers) : (0)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2.4}>
              <Card sx={{ borderRadius: '12px', height: '100%' }}>
                <CardContent>
                  <Stack
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ flex: 1 }}
                  >
                    <Box width="50%">
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Karma</Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="flex-end">
                      <SentimentSatisfiedAltIcon sx={{color: "grey"}}/>
                    </Box>
                  </Stack>  
                  <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{totalKarma ? (totalKarma) : (0)}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={2.4}>
              {totalFlags > 0 ? (
                <Link href="/server/flags" underline='none'>
                  <Card sx={{ borderRadius: '12px', height: '100%' }}>
                    <CardContent>
                      <Stack
                        container
                        direction="row"
                        alignItems="center"
                        sx={{ flex: 1 }}
                      >
                        <Box width="50%">
                          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" textTransform="uppercase" color="#C70039">Flags</Typography>
                        </Box>
                        <Box width="50%" display="flex" justifyContent="flex-end">
                          <EmojiFlagsTwoToneIcon sx={{color: "red"}}/>
                        </Box>
                      </Stack>  
                      <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif" color="#C70039">
                        {totalFlags}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card sx={{ borderRadius: '12px', height: '100%' }}>
                  <CardContent>
                    <Stack
                      container
                      direction="row"
                      alignItems="center"
                      sx={{ flex: 1 }}
                    >
                      <Box width="50%">
                        <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif">Flags</Typography>
                      </Box>
                      <Box width="50%" display="flex" justifyContent="flex-end">
                        <EmojiFlagsTwoToneIcon sx={{color: "#5dab3e"}}/>
                      </Box>
                    </Stack>  
                    <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">0</Typography>
                  </CardContent>
                </Card>
              )
              }

            </Grid>
          </Grid>
        </Box>
        {/* Messages & Channel Graphs */}
        <Box height="35vh" width="100%">
          <Grid container direction="row" spacing={0}>
            <Grid item md={8}>
              {/* Data line graph */}
              {messages && <MyResponsiveLine messages={messages} />}
            </Grid>
            <Grid item md={4}>
              <Typography 
                  variant="h1"
                  fontSize="1.5rem"
                  component="div"
                  textAlign="center"
                  color="#1B3312"
                  width="100%"
                  marginTop={4}
                  marginBottom={-3}
                  fontFamily="'PT Sans Caption', sans-serif"
                >
                Server Health
              </Typography>
              <ServerHealthCircle serverHealth={serverHealth} circleColor={circleColor}/>
              {/* The channels bar graph */}
            </Grid>
          </Grid>
        </Box>
        {/* User Graph */}
        <Box height="40vh" width="100%">
          <Grid container direction="row" spacing={0}>
            <Grid item md={8}>
              <UserChart users={users}/>
            </Grid>
            <Grid item md={4} >
              <MyResponsiveBar data={channels}/>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default Dash;