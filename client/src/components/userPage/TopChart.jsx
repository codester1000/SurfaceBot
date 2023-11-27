import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { monthAnalysis, weekAnalysis } from '../functions/DateFunction.js';

const TopChart = ({ messages }) => {
  const [messageCounts, setMessageCounts] = useState({})
  const [setting, setSetting] = useState("month")

  useEffect(() => {
    let data = ""
    if (setting === "month") {
      data = monthAnalysis( messages );
    } if (setting === "week") {
      data = weekAnalysis( messages );
    } else {
      data = monthAnalysis( messages );
    }
  
    setMessageCounts(data);
  }, [messages]);
  



  // Count messages for the last 6 months

  // Generate data array in the desired format
  return (
    <Stack container item direction="column" margin={4} height="100%" width="100%">
      {/* <Typography variant="h6">Messages</Typography> */}
      <Box width="100%" height="100%">
        <ResponsiveContainer height="100%" aspect={4}>
          <LineChart data={messageCounts}>
            <XAxis dataKey="name" tick={{ stroke: "#ccc", fontSize: 12, fontWeight: "lighter" }} tickLine={false} axisLine={false} />
            <YAxis tick={{ stroke: "#ccc", fontSize: 12, fontWeight: "lighter" }} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#424549" strokeWidth={3} fill="#424549" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

    </Stack>
  );
};

export default TopChart;

