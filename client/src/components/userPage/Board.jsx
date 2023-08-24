import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TopCards from '../cards/TopCards';
import TopChart from '../TopChart';
import BrTable from '../cards/BrTable';
import { Box } from '@mui/material';
import Flags from '../cards/Flags';
import Info from '../Info';
import { useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Board = ({ server, users, channels, messages }) => {

  // const voiceChannels = channels.filter((channel) => channel.type === 2);
  // const messageChannels = channels.filter((channel) => channel.type === 0);
  const [totalUsers, setTotalUsers] = useState(null)
  const [totalMessages, setTotalMessages] = useState(null)
  const [totalKarma, setTotalKarma] = useState(null)
  const [flaggedUsers, setFlaggedUsers] = useState([])
  const [serverHealth, setServerHealth] = useState(null)

  const getUserFlags = async () => {
    try {
      const data = await users.filter((user) => user.flags.length > 0)
      setFlaggedUsers(data)
    } catch (err) {
      console.log(err)
    }
  }

  const calcServerHealth = (karma, messages, users) => {
    try {
      var health = messages * 10
      health = karma/health
      const activeFlags = users.filter((users) => users.flags.length > 0)
      var messageUsers = users.filter((users) => users.numberOfMessages > 0)
      messageUsers = (messageUsers.length / users.length)
      health = (health*0.5) + (messageUsers*0.5)
      health = health - (activeFlags.length / 10)
      health = health.toString().slice(0, 4)*100 + "%"
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
    const health = calcServerHealth(server.karma, server.messagesSent, users)
    setServerHealth(health)
    getUserFlags()
  }, [])

  return (
    <Box maxWidth="xl" marginY={4}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={8} height="100%" width="100%">
          <Grid direction="column" container spacing={1} height="100%">
            <Grid item md={1} height="auto">
              <Info serverName={server.serverName} />
            </Grid>
            <Grid item md={5}>
              <Stack direction="row" spacing={2} width="100%" height="auto">
                <TopCards
                  title="Messages"
                  data={totalMessages}
                  cardSx={{border: "1px grey solid"}}
                  typeSx={{ color: "grey" }}
                  icon={<ChatBubbleOutlineIcon sx={{color: "grey"}}/>}
                />
                <TopCards title="Users" data={totalUsers} 
                  cardSx={{border: "1px grey solid"}}
                  typeSx={{ color: "grey" }}
                  icon={<AccountCircleRoundedIcon sx={{color: "grey"}}/>}/>
                <TopCards title="Karma" data={totalKarma}
                  cardSx={{border: "1px grey solid"}}
                  typeSx={{ color: "grey" }}
                  icon={<SentimentSatisfiedAltIcon sx={{color: "grey"}}/>}/>
                <TopCards title="Health" data={serverHealth} 
                  cardSx={{border: "1px grey solid"}}
                  typeSx={{ color: "grey" }}
                  icon={<HealthAndSafetyIcon sx={{color: "grey"}}/>}/>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} height="auto">
              {messages && <TopChart messages={messages} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} width="100%">
          <Grid container direction="column">
            <Grid item md={6} width="100%">
              <Flags flags={flaggedUsers} />
            </Grid>
            <Grid item md={6} width="100%">
              <BrTable users={users} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Board;
