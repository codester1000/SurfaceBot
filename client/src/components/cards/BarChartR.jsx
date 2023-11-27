// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar]
import React, { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { Typography, Box } from '@mui/material';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ data /* see data tab */ }) => {
  const [barData, setBarData] = useState([])
  const [serverType, setServerType] = useState("messages")
  useEffect(() => {
    const bar = []
    if (serverType === "messages") {
      for (let i=0; i<data.length; i++) {
        if (data[i].type == 0) {
          bar.push(
            {
              channel: data[i].channelName,
              messages: data[i].messagesSent,
              messagesColor: "hsl(103, 47%, 46%)",
              karma: data[i].karma,
              karmaColor: "hsl(68, 63%, 51%)"
            }
            )
        }
        setBarData(bar)
      }
    } else {

    }
  }, [data]);
  return (
    <Box width="100%" height="35vh" >
      <Typography 
        variant="h1"
        fontSize="1.5rem"
        component="div"
        textAlign="center"
        color="#1B3312"
        width="100%"
        marginTop={-2}
        marginBottom={2}
        fontFamily="'PT Sans Caption', sans-serif"
      >
        Channel Analysis
      </Typography>
      <ResponsiveBar
        data={barData}
        keys={[
            'karma',
            'messages',
            
        ]}
        indexBy="channel"
        margin={{ top: 5, right: 130, bottom: 50, left: 40 }}
        padding={0.1}
        innerPadding={2}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={['#5dab3e', '#bcd131']}
        axisTop={null}
        axisRight={null}
        borderRadius={"3%"}

        axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Channels',
            legendPosition: 'middle',
            legendOffset: 29
        }}
        axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 0
        }}
        enableGridY={false}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
    </Box>
  )
}

export default MyResponsiveBar;