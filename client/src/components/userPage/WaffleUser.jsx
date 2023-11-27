// yarn add @nivo/waffle
import { ResponsiveWaffle } from '@nivo/waffle'
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const collectKarmas = (userMessages) => {
  const dataKarma = [
    {
      "id": "zero",
      "label": "Zero",
      "value": 0,
    }, 
    {
      "id": "low",
      "label": "Low",
      "value": 0,
    },
    {
      "id": "five",
      "label": "Average",
      "value": 0,
    },
    {
      "id": "high",
      "label": "High",
      "value": 0,
    },
    {
      "id": "ten",
      "label": "Perfect",
      "value": 0,
    },
  ]
  const countKarma = {
    zero: 0,
    low: 0,
    five: 0,
    high: 0,
    ten: 0,
  }
  for (let i=0; i < userMessages.length; i++) {
    if (userMessages[i].karma === 0) {
      countKarma.zero += 1
    } else if (userMessages[i].karma < 5) {
      countKarma.low += 1
    } else if (userMessages[i].karma === 5) {
      countKarma.five += 1
    } else if (userMessages[i].karma < 10) {
      countKarma.high += 1
    } else if (userMessages[i].karma === 10) {
      countKarma.ten += 1
    }
  }
  const totalCount = userMessages.length;
  dataKarma.forEach(item => {
    const karmaId = item.id;
    item.value = (countKarma[karmaId] / totalCount) * 100;
  });
  return dataKarma
}

const WaffleUser = ({ messages /* see data tab */ }) => {
  const [userMessages, setUserMessages] = useState([])
  const [percentageKarma, setPercentageKarma] = useState([])
  const currentHeight = window.innerHeight*0.25;

  const getMessages = async (serverMessagesIDs) => {
    try {
      const response = await fetch('http://localhost:3000/messages', {
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
      
      const uMessages = result.filter((message) => {return serverMessagesIDs.includes(message.messageID) })
      setUserMessages(uMessages)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userMessages.length > 0) {
      const percKarma = collectKarmas(userMessages)
      setPercentageKarma(percKarma)
    } else {
      getMessages(messages)
    }
  }, [userMessages]);

  return (
    <Box maxHeight="100%" maxWidth="100%" height={currentHeight}>
      <ResponsiveWaffle
          data={percentageKarma}
          total={100}
          rows={12}
          columns={12}
          padding={1}
          valueFormat=".2f"
          margin={{ top: 10, right: 10, bottom: 10, left: 60 }}
          colors={[ '#C70039', '#FF5733', '#FFC300', '#bcd131', '#5dab3e' ]}
          borderRadius={3}
          borderColor={{
              from: 'color',
              modifiers: [
                  [
                      'darker',
                      0.3
                  ]
              ]
          }}
          motionStagger={2}
          legends={[
              {
                  anchor: 'top-left',
                  direction: 'column',
                  justify: false,
                  translateX: -60,
                  translateY: 0,
                  itemsSpacing: 4,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  itemTextColor: '#777',
                  symbolSize: 20,
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#3a4037',
                              itemBackground: '#f7fafb'
                          }
                      }
                  ]
              }
          ]}
      />
    </Box>
  )
}

export default WaffleUser