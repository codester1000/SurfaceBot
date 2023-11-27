// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/calendar
import { ResponsiveTimeRange } from '@nivo/calendar'
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}-${month}-${date}`;
}
function get9monthBackDate() {
  const today = new Date();
  today.setMonth(today.getMonth() - 9); // Subtract 6 months
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  const date = today.getDate();

  // Handle cases where the new month might not have the same day
  if (today.getDate() !== date) {
    today.setDate(0); // Set the day to the last day of the previous month
    month = today.getMonth() + 1;
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
}

const UserTimeRange = ({ messages }) => {
  const [userMessages, setUserMessages] = useState([])
  const [startDate, setStartDate] = useState(get9monthBackDate())
  const [datesData, setDatesData] = useState([])
  const [currentDate, setCurrentDate] = useState(getDate());
  const currentHeight = window.innerHeight*0.35;

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
      
      const usersMessages = result.filter((message) => {return serverMessagesIDs.includes(message.messageID) })
      setUserMessages(usersMessages)
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (userMessages.length > 0 && datesData.length == 0 ) {
      const dates = [];
      for (let i = 0; i < userMessages.length; i++) {
        const date = userMessages[i].createdAt.split("T")[0];
        const dateExistsIndex = dates.findIndex((obj) => obj.day === date);
        if (dateExistsIndex !== -1) {
          dates[dateExistsIndex].value += 1;
        } else {
          dates.push({ value: 1, day: date });
        }
      }
      setDatesData(dates)
    } else if (userMessages.length === 0) {
      getMessages(messages)
    }
    
  }, [userMessages]);

  return (
    <Box maxHeight="100%" maxWidth="100%" height={currentHeight}>
      <ResponsiveTimeRange
        data={datesData}
        from={startDate}
        to={currentDate}
        emptyColor="#eeeeee"
        colors={[ '#dde898', '#bcd131', '#5dab3e', '#41772b' ]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        firstWeekday="monday"
        dayRadius={20}
        weekdayLegendOffset={40}
        dayBorderWidth={0}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            itemCount: 4,
            itemWidth: 40,
            itemHeight: 69,
            itemsSpacing: 17,
            itemDirection: 'left-to-right',
            translateX: -60,
            translateY: -85,
            symbolSize: 20
          }
        ]}
      />
      {/* <ResponsiveCalendar
        data={datesData}
        from={startDate}
        to={currentDate}
        emptyColor="#eeeeee"
        colors={[ '#D6E383', '#bcd131', '#5dab3e', "#41772b" ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
      /> */}
    </Box>

  )
}

export default UserTimeRange