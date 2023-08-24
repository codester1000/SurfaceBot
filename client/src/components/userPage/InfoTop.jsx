import { Typography, Stack, Container, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopCards from "../cards/TopCards";
import timeFix from "../functions/TimeFunction";
import timeSince from "../functions/TimeSince";

const InfoTop = ({ user }) => {

  const [roles, setRoles] = useState(null)


  useEffect(() => {
    if (user.roles && user.roles.length > 0) {
      setRoles(user.roles)
    }

  }, [user])

  return (
    <Stack container item direction="column" paddingY={4} md={7}>
      <Stack container direction="column" padding={2}>
          <Typography variant="h3">
              {user.username}
          </Typography>
          <Stack container item direction="row" spacing={2} >
            {roles !== null ? (
              <Typography variant="h7">{user.roles[0]}</Typography>
            ) : (
              <Typography variant="h7">No Roles</Typography>
            )}
            <Typography variant="h7">
              {user.username}#{user.discriminator}
            </Typography>
          </Stack>
      </Stack>
    </Stack>
  )
}

export default InfoTop;