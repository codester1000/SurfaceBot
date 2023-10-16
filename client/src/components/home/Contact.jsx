import React, { useState } from 'react';
import { Stack, Typography, Grid, TextField, Button } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useForm, Controller } from 'react-hook-form';

const Contact = () => {
  const [hovered, setHovered] = useState(false);
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Replace this with your form submission logic.
    // 'data' will contain the form field values.
    console.log(data);
    reset();
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" marginX={12} marginTop={12} marginBottom={12}>
        <Stack direction="column" width="60%" paddingTop={2} spacing={2}>
          <Typography variant="h2" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>
            Help Us <br />
            <span style={{ color: "#5dab3e" }}>Help you</span>
          </Typography>
          <Typography fontFamily="'PT Sans Caption', sans-serif" fontSize={12} color="secondary" lineHeight={1.3} width="80%">
            Send us a message if you are interested in how we can help you surface a better community. <br /> <br /> We will get back to you ASAP
          </Typography>
        </Stack>
        <Stack direction="column" width="70%" spacing={2} paddingTop={2}>
          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" lineHeight={1.3} paddingLeft={2} fontSize={20}>Reach out to us</Typography>
          <Grid container>
            <Grid item xs={12} md={6} paddingY={4} paddingX={2}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="name"
                    variant="standard"
                    color="primary"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} paddingY={4} paddingX={2}>
              <Controller
                name="subject"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="subject"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} paddingY={4} paddingX={2}>
              <Controller
                name="server"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="server"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} paddingY={4} paddingX={2}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="email"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={10} paddingY={4} paddingX={2}>
              <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="message"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Button
                type="submit"
                variant="contained"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                  backgroundColor: "white",
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  boxShadow: 'none',
                  color: hovered ?  '#5dab3e' : '#767A7A',
                  '&:hover': {
                    backgroundColor: 'white', // Add your desired hover background color
                    boxShadow: 'none',

                  },
                }}
              >
                <Typography variant="button" fontFamily="'PT Sans Caption', sans-serif"
                  sx={{
                    textTransform: 'none', // Prevent capitalization

                  }}  
                >
                  submit
                </Typography>
                <KeyboardArrowRightOutlinedIcon
                  style={{
                    fontSize: 24,
                    transition: 'margin-left 0.3s ease-in-out',
                    marginLeft: hovered ? '10px' : '0',
                    color: hovered ?  '#5dab3e' : '#767A7A',
                    '&:hover': {
                      backgroundColor: 'white', // Add your desired hover background color
                      boxShadow: 'none',
                      transform: 'translateX(10px)',
                    },
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </form>
  );
};

export default Contact;
