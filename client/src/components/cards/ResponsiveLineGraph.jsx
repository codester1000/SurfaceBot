// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import React from 'react';

import { ResponsiveLine } from '@nivo/line'
import { monthAnalysis, monthKarmaAnalysis } from '../functions/DateFunction.js';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = ({ messages /* see data tab */ }) => {
  const [messageCounts, setMessageCounts] = useState([])
  const [setting, setSetting] = useState("month")

  useEffect(() => {
    let data = ""
    const messageData = monthAnalysis( messages );
    const karmaData = monthKarmaAnalysis( messages );

    data = [{
      "id": "messages",
      "color": "hsl(103, 47%, 46%)",
      "data": messageData
    },
    {
      "id": "karma",
      "color": "hsl(68, 63%, 51%)",
      "data": karmaData
    }]

    setMessageCounts(data);
  }, [messages]);
  return (
    <Box width="100%" height="35vh" >
      {/* <Typography variant='h4' fontFamily="'PT Sans Caption', sans-serif"> Graph </Typography> */}
      <ResponsiveLine
          data={messageCounts}
          margin={{ top: 20, right: 100, bottom: 30, left: 25 }}
          xScale={{ type: 'point' }}
          yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false
          }}
          axisBottom={{
            tickSize: 0,
          }}
          axisLeft={{
            tickSize: 0,
          }}
          yFormat=" >-.2f"
          enableGridX={false}
          enableGridY={false}
          curve="catmullRom"
          colors={['#bcd131', '#5dab3e']}
          colorBy="index"
          axisTop={null}
          axisRight={null}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          enableCrosshair={false}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
    </Box>
    
  )
}

export default MyResponsiveLine;