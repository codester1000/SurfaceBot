import { Typography, Stack, Container, Box, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import TopCards from "../cards/TopCards";
import InfoTop from "./InfoTop";
import UserStats from "./UserStats";
import SideBar from "../SideBar";
import axios from 'axios';
import timeFix from "../functions/TimeFunction";
import UserTimeRange from "./UserTimeRange";
import WaffleUser from "./WaffleUser";
import MessagesChart from "./MessagesChart.jsx";
import InviteNetwork from "./InviteNetwork";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';



const getUserInfo = async (serverID, userID) => {
  try {
    const response = await fetch(`http://localhost:3000/users/byServerUser/${serverID}/${userID}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const User = () => {
  const { userID } = useParams();
  const [userInfo, setUser] = useState();
  const [serverID, setServerID] = useState("");

  const [test, setTest] = useState(false);
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
  } = useAuth0();
  const [voiceTime, setVoiceTime] = useState("");


  const getAppMetadata = async () => {
    if (!user) {
      return;
    }
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://dev-js8ftpmxvz3p28qp.us.auth0.com/api/v2/users/${user.sub}`,
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${process.env.REACT_APP_AUTH0_MANAGEMENT_TOKEN}`, 
        }
      }

      axios.request(config)
      .then((response) => {
        setServerID(response.data.app_metadata.server)
      })
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with an error status code
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          // Something else happened while setting up the request or handling the response
          console.error("Request error:", error.message);
        }

      });
    } catch (e) {
        console.log(e.message);
    }
  } 

  useEffect(() => {
    if (!isLoading) {
      getAppMetadata()
    } 
    if (serverID !== "" && userID !== "") {
      const fetchData = async () => {
        const result = await getUserInfo(serverID, userID);
        setUser(result);
        const timey = await timeFix(result.voiceChatTime);
        setVoiceTime(timey);
      };

      if (serverID !== "" && userID !== "") {
        fetchData();
      }
    } else {
      getAppMetadata()
    }

    
  }, [userID, isLoading, serverID]);

  return (
    <Container maxWidth="1500px" width="100%">
      <Grid container direction="row" spacing={0}>
        {/* Sidebar */}
        <Grid item md={0.75}>
          <SideBar /> 
        </Grid>
        <Grid item xs={12} md={11.25} height="100%" width="100%">
          {isLoading && (
            <Box 
              maxWidth="xl"
              height="100vh"
              display="flex"
              justifyContent="center"
              marginY="auto"
              alignItems="center"
            >
              <CircularProgress size={80}/>
            </Box>
          )}
          {userInfo && isAuthenticated && (
            <Box maxWidth="xl" marginX="auto">
              <Stack>
                <Box height="15vh" paddingTop={1}>
                  <InfoTop user={userInfo}/>
                </Box>
                <Box height="15vh">
                  <Grid container direction="row" spacing={0} height="100%">
                    <Grid item md={3}>
                      <Card sx={{ borderRadius: '12px', height: '100%' }}>
                        <CardContent >
                          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Messages</Typography>
                          <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{userInfo.numberOfMessages ? (userInfo.numberOfMessages) : (0)}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
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
                              <ChatBubbleOutlineIcon sx={{color: "grey"}}/>
                            </Box>
                          </Stack>
                          <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{voiceTime ? (voiceTime) : ("00:00:00")}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card sx={{ borderRadius: '12px', height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Karma</Typography>
                          <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{userInfo.karma ? (userInfo.karma) : (0)}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card sx={{ borderRadius: '12px', height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">Flags</Typography>
                          <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif">{userInfo.flags ? (userInfo.flags.length) : (0)}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
                {/* Messages activity calender and Channel Interactions */}
                <Box height="35vh" paddingTop="2vh">
                  <Grid container direction="row" spacing={0}>
                    <Grid item md={8}>
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginLeft={6} color="#3a4037">User Message Activity</Typography>

                      {userInfo.messages && <UserTimeRange messages={userInfo.messages} />}
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" width="100%" textAlign="center" color="#3a4037">Message Karma Breakdown</Typography>
                      {userInfo.messages && <WaffleUser messages={userInfo.messages} />}
                    </Grid>
                  </Grid>
                </Box>
                {/* Recent Messages and Invites */}
                <Box height="35vh">
                  <Grid container direction="row" spacing={0}>
                    <Grid item md={8}>
                      <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginLeft={6} color="#3a4037">Recent Messages</Typography>

                      {userInfo.messages && <MessagesChart messages={userInfo.messages} />}
                    </Grid>
                    <Grid item md={4}>
                      {userInfo.invitees && <InviteNetwork invitees={userInfo.invitees} username={userInfo.username} serverID={serverID}/>}
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>
          )}
        </Grid>
      </Grid>

    </Container>

  );
};

export default User;