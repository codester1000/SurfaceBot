import React from "react";
import { Card, CardContent, Typography, Container, Box, Stack } from "@mui/material";

const TopCards = (props) => {
  return (
    <Card
      sx={{
        display: "flex",
        borderRadius: "24px", // Rounded corners
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between", // Align title to top, data to bottom
        border: "1px black solid",
        // background: "linear-gradient(to bottom left, #bcd131, #5dab3e)", // Green background
        '& .MuiTableCell-root': {
          borderBottom: 'none', // Remove borders on rows
        },
        boxShadow: "none",
        height: "150px",
        ...props.sx,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Stack container direction="row" height="100%" alignItems="center">
        <Box width="50%" height="100%">
          <Typography variant="h6"           
            sx={{
              ...props.typeSx,
            }}>
            {props.title}
          </Typography>
        </Box>
        <Box width="50%" display="flex" justifyContent="flex-end" paddingRight={1} height="100%">
          {props.icon}
        </Box>
      </Stack>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h4" component="h3" sx={{ color: "black" }}>
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  )
};
export default TopCards;
