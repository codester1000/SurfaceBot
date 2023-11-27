import React, {useEffect, useState} from 'react';
import { Typography, Stack, Container, Box, Grid, Card, CardContent, CircularProgress, Avatar } from "@mui/material";
import SideBar from "../SideBar";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import InfoTop from '../userPage/InfoTop';
import { format } from 'date-fns';



const getServerFlags = async (serverID)  => {
  try {
    const response = await fetch('http://localhost:3000/servers', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    // this needs to be changed when searching
    const yourServer = await result.filter((server) => {return server.serverID == serverID})
    
    return yourServer[0].flaggedMessages
    

  } catch (err) {
    console.log(err);
  } 
}

const getFlaggedMessages = async (serverID, serverMessagesIDs) => {
  try {
    const surroundingMessages = [];
    for (const messageId of serverMessagesIDs) {
      const response = await fetch(`http://localhost:3000/messages/surrounding/${messageId}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();

      // Fetch user data for each message and add it to the message object
      for (const messageGroup of ['before', 'target', 'after']) {
        if (Array.isArray(result[messageGroup])) {
          for (const message of result[messageGroup]) {
            const user = await getFlaggedUser(serverID, message.user);
            message.user = user;
          }
        } else {
          const user = await getFlaggedUser(serverID, result[messageGroup].user);
          result[messageGroup].user = user;
        }
      }

      surroundingMessages.push(result);
    }
    console.log(surroundingMessages)

    return surroundingMessages;
  } catch (err) {
    console.log(err);
  }
}

const getFlaggedUser = async (serverID, userID) => {
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


const FlagPage = () => {
  const [flagIds, setFlagIds] = useState([]);
  const [serverID, setServerID] = useState("");
  const [messages, setMessages] = useState("")
  const [focus, setFocus] = useState(null)
  const [focusedUser, setFocusedUser] = useState()
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
  } = useAuth0();

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
    if (!isLoading && serverID === "") {
      getAppMetadata()
    } else {
      console.log("loading", isLoading, "authed", isAuthenticated)
    }
    if (flagIds.length > 0) {
      const getFlagInfo = async () => {
        const result = await getFlaggedMessages(serverID, flagIds)
        setMessages(result)
        console.log(result, "result")
        if (result[0]) {
          setFocus(result[0])
          setFocusedUser(result[0].target.user)
        }
      }
      getFlagInfo()
    } else if (serverID !== "") {
      const fetchData = async () => {
        const result = await getServerFlags(serverID);
        setFlagIds(result);
      };
      fetchData()
    } else if (focus) {
      console.log(focus)
    }

  }, [flagIds, serverID, isLoading])

  return (
    <>
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
            {focus && isAuthenticated && focusedUser && (
              <Box maxWidth="xl" marginX="auto">
                <Grid container direction="row" spacing={2}>
                  <Grid item sm={6} md={8} height="100vh" width="100%">
                  <Box height="15%" paddingTop={1}>
                    {focusedUser && <InfoTop user={focusedUser}/>}
                  </Box>
                  <Box 
                    height="85%" 
                    bgcolor="#2f3136" 
                    color="white" 
                    borderRadius={6} 
                    padding={2} 
                    overflow="auto"
                    
                  >
                    {focus.before.map((message, index) => (
                      <Box 
                        key={index}
                        borderRadius={6} 
                        padding={1} 
                        marginBottom={1}
                        display="flex"
                        border={message.flagCategoryScores ? "0.25px solid red" : "none"}
                      >
                        <Avatar src={message.user.iconURL} />
                        <Box marginLeft={1}>
                          <Stack direction="row" alignItems="flex-end">
                            <Typography variant="body1" fontWeight={700}>
                              {message.user.username}
                            </Typography>
                            <Typography variant="caption" color="gray" marginLeft={1}>
                            {format(new Date(message.date), 'Pp')}
                          </Typography>
                          </Stack>
                          <Typography variant="body2">
                            {message.messageContent}
                          </Typography>

                        </Box>
                      </Box>
                    ))}
                    <Box 
                      bgcolor="#4b4f54" 
                      borderRadius={6} 
                      padding={1} 
                      marginBottom={1}
                      display="flex"
                      border="1px solid red"
                    >
                      <Avatar src={focus.target.user.iconURL} />
                      <Box marginLeft={1}>
                        <Stack direction="row" alignItems="flex-end">
                          <Typography variant="body1" fontWeight={700}>
                            {focusedUser.username}
                          </Typography>
                          <Typography variant="caption" color="gray" marginLeft={1}>
                          {format(new Date(focus.target.date), 'Pp')}
                        </Typography>
                        </Stack>
                        <Typography variant="body2">
                          {focus.target.messageContent}
                        </Typography>
                      </Box>
                    </Box>
                    {focus.after.map((message, index) => (
                      <Box 
                        key={index}
                        borderRadius={6} 
                        padding={1} 
                        marginBottom={1}
                        display="flex"
                        border={message.flagCategoryScores ? "0.25px solid red" : "none"}
                      >
                        <Avatar src={message.user.iconURL} />
                        <Box marginLeft={1}>
                          <Stack direction="row" alignItems="flex-end">
                            <Typography variant="body1" fontWeight={700}>
                              {message.user.username}
                            </Typography>
                            <Typography variant="caption" color="gray" marginLeft={1}>
                            {format(new Date(message.date), 'Pp')}
                          </Typography>
                          </Stack>
                          <Typography variant="body2">
                            {message.messageContent}
                          </Typography>

                        </Box>
                      </Box>
                    ))}
                  </Box>

                  </Grid>
                  <Grid item sm={6} md={4} height="100%" width="100%">
                    <Stack spacing={2} padding={2}>
                      <Box 
                        height="100%" 
                        borderRadius={12} 
                        paddingX={4} 
                        paddingY={2}
                        border="1px solid #e0e0e0" // Add a border
                        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a box shadow
                        backgroundColor="#fff"
                      >
                        <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginBottom={1}>
                          Flagged Categories
                        </Typography>
                        <Typography paddingLeft={2} fontFamily="'PT Sans Caption', sans-serif">
                        {Object.entries(focus.target.flagCategoryScores).map(([category, score]) => (
                          <span key={category}>
                            <span style={{
                              fontWeight: score * 100 > 70 ? 600 : 'normal',
                              color: score * 100 > 70 ? 'red' : 'inherit'
                            }}>
                              {category}: {(score * 100).toFixed(2)}%
                            </span>
                            <br />
                          </span>
                        ))}
                        </Typography>
                      </Box>
                      <Box 
                        height="100%" 
                        borderRadius={12} 
                        paddingX={4} 
                        paddingY={2}
                        border="1px solid #e0e0e0" // Add a border
                        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a box shadow
                        backgroundColor="#fff"
                      >
                        <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginBottom={1}>
                          User's Other Flags
                        </Typography>
                        <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif" paddingLeft={2}>
                          {focusedUser.flags.length}
                        </Typography>
                      </Box>
                      <Box 
                        height="100%" 
                        borderRadius={12} 
                        paddingX={4} 
                        paddingY={2}
                        border="1px solid #e0e0e0" // Add a border
                        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Add a box shadow
                        backgroundColor="#fff"
                      >
                        <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" marginBottom={1}>
                          User Overall Karma
                        </Typography>
                        <Typography variant="h4" fontFamily="'PT Sans Caption', sans-serif" paddingLeft={2}>
                          {focusedUser.karma}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default FlagPage