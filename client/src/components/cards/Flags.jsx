import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import EmojiFlagsRoundedIcon from '@mui/icons-material/EmojiFlagsRounded';

const Flags = ( { flags } ) => {
    return (
        <Box borderRadius={12} 
            height="100%" 
            width="100%"         
            sx={{
                background: "linear-gradient(to top left, #FFD2CF, #FED8B2, #FFFFFF);",
                overflow: "auto",
            }}
            padding={4}
            >
            <Stack direction="column">
                <Stack direction="row" spacing={2} alignItems="center" paddingLeft={2}>
                    <EmojiFlagsRoundedIcon fontSize="large" sx={{color: "#ff8a83"}}/>
                    <Typography variant="h4" component="h3">
                        Flags
                    </Typography>
                </Stack>
                <div style={{ overflow: "auto" }} >
                    <div style={{ overflow: 'auto', height: '250px' }}>
                        <Table 
                            sx={{
                                tableLayout: 'fixed', 
                                backgroundColor: "rgba(255, 255, 255, 0)", // Fully opaque white background
                                '& .MuiTableCell-root': {
                                    borderBottom: 'none', // Remove borders on rows
                                },
                                border: "none",
                                boxShadow: "none",
                            }} >
                        <TableBody>
                            {flags.map((row) => (
                                <TableRow
                                    key={row.userID}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                >
                                    {/* Add in the link to the mesage and the larger page */}
                                    <TableCell scope="row">
                                        <img src={row.avatar} alt="Avatar" height="100%"/>
                                    </TableCell>
                                    <TableCell>{row.username}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                        </div>
                    </div>
            </Stack>
        </Box>
    );
};

export default Flags;
