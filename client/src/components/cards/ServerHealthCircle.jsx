import React from "react"
import { Box, Typography, Card, CardContent, Container, Stack } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const ServerHealthCircle = ({ serverHealth, circleColor }) => {
    return (
      <Box         
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" thickness={5} value={serverHealth} size="10rem"
            sx={{
              color: circleColor,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
              },

            }}
          />
        
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" fontSize="2.5rem" component="div" color="#091106" fontFamily="'PT Sans Caption', sans-serif">
              {`${serverHealth}%`}
            </Typography>
          </Box>
        </Box>
      </Box>
    )
}

export default ServerHealthCircle