import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import timeFix from "../functions/TimeFunction.js";
import { Link } from "react-router-dom";

const columnsM = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "message",
    headerName: "Message",
    width: 450,
    sortable: false,
  },
  {
    field: "karma",
    headerName: "Karma",
    width: 80,
  },
  {
    field: "replies",
    headerName: "Replies",
    width: 80,
  },
  {
    field: "formattedDate",
    headerName: "Date",
    width: 300,
  },
];

const MessagesChart = ({ messages }) => {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("Messages");
  const currentHeight = window.innerHeight;
  const [height, setHeight] = useState(currentHeight * 0.29);
  const [gridHeight, setGridHeight] = useState(currentHeight - 50);
  const [userMessages, setUserMessages] = useState([])


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
      const newRows = userMessages.map((message) => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(message)
        // Create a formatted date string in the user's timezone
        const formattedDate = new Intl.DateTimeFormat('en-AU', {
          timeZone: userTimeZone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).format(new Date(message.createdAt));
          
        return {
          id: message.messageID,
          message: message.messageContent,
          karma: message.karma,
          date: new Date(message.createdAt),
          formattedDate,
          replies: message.replyMessageId.length,
        }
      });
      newRows.sort((a, b) => b.date - a.date);

      setRows(newRows);
    } else {
      getMessages(messages)
    }
  }, [messages, userMessages]);

  return (
    <Box height={height} width="100%">
      <DataGrid
        rows={rows}
        columns={columnsM}
        columnVisibilityModel={{
          id: false
        }}
        pageSizeOptions={[10, 20, 50]}
        density="compact" // Make the DataGrid more dense
        sx={{
          fontFamily: "'PT Sans Caption', sans-serif",
        }}
      />
    </Box>
  );
};

export default MessagesChart;