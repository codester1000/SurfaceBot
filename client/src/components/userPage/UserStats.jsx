import { Typography, Stack, Container, Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopCards from "../cards/TopCards";
import timeFix from "../functions/TimeFunction";
import timeSince from "../functions/TimeSince";

const UserStats = ({ user }) => {
  const [invites, setInvites] = useState(null);
  const [numFlags, setNumFlags] = useState(null);
  const [joinDate, setJoinDate] = useState(null);
  const [voiceTime, setVoiceTime] = useState(null);

  useEffect(() => {
    if (user.flags) {
      setNumFlags(user.flags.length);
    }
    if (user.invitees) {
      setInvites(user.invitees.length);
    }
    const timey = timeFix(user.voiceChatTime);
    setVoiceTime(timey);
    const timeSinceJoin = timeSince(user.joinDate);
    setJoinDate(timeSinceJoin);
  }, [user]);

  return (
    <Container sx={{ height: '100vh', paddingY: 8 }}>
      <Grid container spacing={2} style={{ height: '100%' }}>
        <Grid item xs={12} md={6} style={{ height: '100%' }}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <Grid item xs={12} style={{ height: '33%' }}>
              {user.numberOfMessages !== null ? (
                <TopCards title="Messages" data={user.numberOfMessages} />
              ) : (
                <TopCards title="Messages" data={0} />
              )}
            </Grid>
            <Grid item xs={12} style={{ height: '33%' }}>
              {user.karma !== null ? (
                <TopCards title="Karma" data={user.karma} />
              ) : (
                <TopCards title="Karma" data={0} />
              )}
            </Grid>
            <Grid item xs={12} style={{ height: '33%' }}>
              {joinDate !== null ? (
                <TopCards title="Since Join" data={joinDate} />
              ) : (
                <TopCards title="Since Join" data={'0y0m0d'} />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} style={{ height: '100%' }}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <Grid item xs={12} style={{ height: '33%' }}>
              {invites !== null ? (
                <TopCards title="Invites" data={invites} />
              ) : (
                <TopCards title="Invites" data={0} />
              )}
            </Grid>
            <Grid item xs={12} style={{ height: '33%' }}>
              {numFlags !== null ? (
                <TopCards title="Flags" data={numFlags} />
              ) : (
                <TopCards title="Flags" data={0} />
              )}
            </Grid>
            <Grid item xs={12} style={{ height: '33%' }}>
              {user.voiceChatTime !== null ? (
                <TopCards title="Voice Chat" data={voiceTime} />
              ) : (
                <TopCards title="Voice Chat" data={0} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserStats;
