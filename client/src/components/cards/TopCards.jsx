import React from "react";
import { Card, CardContent, Typography, Container, Box, Stack } from "@mui/material";

const TopCards = (props) => {
  return (
    <Card
      sx={{
        borderRadius: "24px",
        border: "1px black solid",
        boxShadow: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...props.sx,
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack
          container
          direction="row"
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <Box width="50%">
            <Typography
              variant="h6"
              sx={{
                ...props.typeSx,
              }}
            >
              {props.title}
            </Typography>
          </Box>
          <Box width="50%" display="flex" justifyContent="flex-end">
            {props.icon}
          </Box>
        </Stack>
        <div style={{ flex: 1 }} />
        <Typography variant="h4" component="h3" sx={{ color: "black" }}>
          {props.data}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TopCards;
