import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import timeFix from "../functions/TimeFunction.js";
import { Link } from "react-router-dom";

const columns = [
  {
    field: "id",
    headerName: "id",
    width: 150,
    sortable: false,
    hide: true, // Hide the ID column if you don't want to display it
  },
  {
    field: "username",
    headerName: "Username",
    width: 200,
    sortable: false,
    renderCell: (params) => (
      <Link
        to={`/server/${params.row.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "messages",
    headerName: "Messages",
    width: 150,
  },
  {
    field: "voice",
    headerName: "Voice",
    width: 150,
  },
  {
    field: "karma",
    headerName: "Karma",
    width: 150,
  },
  {
    field: "invites",
    headerName: "Invites",
    width: 150,
  },
];

export const UserChart = ({ users }) => {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("Messages");
  const currentHeight = window.innerHeight;
  const [height, setHeight] = useState(currentHeight * 0.39);
  const [gridHeight, setGridHeight] = useState(currentHeight - 50);

  useEffect(() => {
    if (users && users.length > 0) {
      const newRows = users.map((user) => {
        const voiceTime = timeFix(user.voiceChatTime);
        return {
          avatar: user.avatar,
          id: user.userID,
          username: user.username,
          messages: user.numberOfMessages,
          voice: voiceTime,
          karma: user.karma,
          invites: user.invitees.length,
        };
      });
      setRows(newRows);
    }
  }, [users]);

  return (
    <Box height={height} width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          id: false,
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        density="compact" // Make the DataGrid more dense
        sx={{
          fontFamily: "'PT Sans Caption', sans-serif",
        }}
      />
    </Box>
  );
};
