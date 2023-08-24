import { Typography, Stack, Container, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopCards from "../cards/TopCards";
import InfoTop from "./InfoTop";
import UserStats from "./UserStats";

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
  const { serverID, userID } = useParams();
  const [user, setUser] = useState({});




  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserInfo(serverID, userID);
      setUser(result);
    };
    fetchData();

    
  }, [serverID, userID]);

  return (
    <Container maxWidth="1500px" width="100%">
        {user !== null && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InfoTop user={user}/>
          </Grid>
          <Grid item xs={6}>
            <UserStats user={user} />
          </Grid>
        </Grid>
        )}
    </Container>

  );
};

export default User;