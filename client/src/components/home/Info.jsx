import * as React from 'react';
import { Container, Box, Typography, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Info = (props) => {
    return (
        <Stack container direction="row" height="100%">
            <Box width="50%" height="100%">
                <Typography variant="h3" height="100%">
                    {props.serverName}
                </Typography>
            </Box>
            <Box width="50%" display="flex" justifyContent="flex-end" paddingRight={4} height="100%">
                <TextField
                    id="standard-basic"
                    placeholder="Search"
                    variant="standard"
                    color="success"
                    height="100%"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                        style: {
                        borderBottom: 'none', // Remove the default underline
                        },
                    }}
                    InputLabelProps={{
                        shrink: true, // Keep the label from floating up
                    }}
                    />            
            </Box>

        </Stack>
    );
}

export default Info;