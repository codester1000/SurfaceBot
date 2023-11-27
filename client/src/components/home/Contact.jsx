import React, { useState } from 'react';
import { Stack, Typography, Grid, TextField, Button } from '@mui/material';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [hovered, setHovered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();

  const toastifySuccess = () => {
    toast('Contact Made!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast',
    });
  };

  const onSubmit = async (data) => {

    setSubmitted(true);
    const {name, email, subject, message, server} = data;
    
    if (isValidEmail(data.email) && data.name.length > 2 && data.server.length > 2 ) {
      console.log(data)
      setSubmitted(false);

      try {
        const templateParams = {
          name,
          email,
          subject,
          message,
          server,
        };
        await emailjs.send(
          "SurfaceBot161969",
          "template_jiv049d",
          templateParams,
          "jIMGFCiWWSpvhiUx0"
        );
        reset();
      } catch (e) {
        console.log(e);
        toast('Sorry there was an error, try again', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback error',
          toastId: 'notifyToast',
        });
      }      
      reset();
      toastifySuccess();
    } else {
      if (data.name.length == 2 || data.name.length == 1){
        toast('Your name must be at least 3 characters', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback error',
          toastId: 'notifyToast',
        });
      } 
      if (data.server.length == 2 || data.server.length == 1){
        toast(`Your server's name must be at least 3 characters`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback error',
          toastId: 'notifyToast',
        });
      }
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Custom email validation function
  const isValidEmail = (email) => {
    // You can use a regular expression or any email validation logic here
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate id="contact-section" className="smooth-scrolling">
      <Stack direction="row" marginX={12} marginTop={12} marginBottom={12}>
        <Stack direction="column" width="60%" paddingTop={2} spacing={2}>
          <Typography variant="h2" fontFamily="'PT Sans Caption', sans-serif" color="primary" lineHeight={1.3}>
            Help Us <br />
            <span style={{ color: "#5dab3e" }}>Help You</span>
          </Typography>
          <Typography fontFamily="'PT Sans Caption', sans-serif" fontSize={12} color="secondary" lineHeight={1.3} width="80%">
            Send us a message if you are interested in how we can help you surface a better community. <br /> <br /> We will get back to you ASAP
          </Typography>
        </Stack>
        <Stack direction="column" width="70%" spacing={2} paddingTop={2}>
          <Typography variant="h6" fontFamily="'PT Sans Caption', sans-serif" color="#3C4142" lineHeight={1.3} paddingLeft={2} fontSize={20}>
            Reach out to us
          </Typography>
          <Grid container 
            sx={{
              textTransform: "lowercase",
            }}
          >
            <Grid item xs={12} md={6} paddingY={4} paddingX={2}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Name"
                    variant="standard"
                    color={submitted && field.value.trim() === '' ? "error" : "primary"}
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    required
                    error={submitted && field.value.trim() === ''}
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
                    label="Subject"
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
                    label="Server"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    required
                    error={submitted && field.value.trim() === ''}
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
                    label="Email"
                    variant="standard"
                    sx={{ width: "100%" }}
                    InputLabelProps={{ shrink: true }}
                    {...field}
                    required
                    error={submitted && (!field.value || !isValidEmail(field.value))}
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
                    label="Message"
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
                  color: hovered ? '#5dab3e' : '#767A7A',
                  '&:hover': {
                    backgroundColor: 'white',
                    boxShadow: 'none',
                  },
                }}
              >
                <Typography variant="button" fontFamily="'PT Sans Caption', sans-serif"
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  Submit
                </Typography>
                <KeyboardArrowRightOutlinedIcon
                  style={{
                    fontSize: 24,
                    transition: 'margin-left 0.3s ease-in-out',
                    marginLeft: hovered ? '10px' : '0',
                    color: hovered ? '#5dab3e' : '#767A7A',
                    '&:hover': {
                      backgroundColor: 'white',
                      boxShadow: 'none',
                      transform: 'translateX(10px)',
                    },
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </Stack>
        <ToastContainer />
      </Stack>
    </form>
  );
};

export default Contact;
