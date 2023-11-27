import { Typography, Stack, Container, Box, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopCards from "../cards/TopCards";
import timeFix from "../functions/TimeFunction";
import timeSince from "../functions/TimeSince";

const InfoTop = ({ user }) => {
  const [joinDate, setJoinDate] = useState(null);

  const [roles, setRoles] = useState(null)

  useEffect(() => {
    if (user.roles && user.roles.length > 0) {
      setRoles(user.roles)
    }
    const timeSinceJoin = timeSince(user.joinDate);
    setJoinDate(timeSinceJoin);

  }, [user])

  return (
    <Stack container direction="column">
        <Link href={`/server/${user.userID}`} underline='none'>
          <Typography variant="h3" fontFamily="'PT Sans Caption', sans-serif" color="#1B3312">
              {user.username}
          </Typography>
        </Link>
        <Stack container item direction="row" spacing={5} >
          {roles !== null ? (
            <Typography variant="h7" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">{user.roles[0]}</Typography>
          ) : (
            <Typography variant="h7" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">No Roles</Typography>
          )}
          <Typography variant="h7" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">
            {user.username}#{user.discriminator}
          </Typography>
          <Typography variant="h7" fontFamily="'PT Sans Caption', sans-serif" color="#3a4037">
            Joined: {joinDate} ago
          </Typography>
        </Stack>
    </Stack>
  )
}

export default InfoTop;