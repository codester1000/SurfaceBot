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
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MessageSort from "../functions/MessageSort";
import { TablePagination, TableFooter } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const BrTable = (users) => {
    const [rows, setRows] = useState([])
    const [title, setTitle] = useState("Messages")
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    useEffect(() => {
        const data = MessageSort(title, users)
        setRows(data)
    }, [title])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleGoToFirstPage = () => {
        setPage(0);
    };

    const handleGoToLastPage = () => {
        setPage(Math.max(0, Math.ceil(rows.length / rowsPerPage) - 1));
    };



    return (
        <Box borderRadius={12} 
            height="100%" 
            width="100%"         
            padding={4}
            >
            <Stack direction="column">
                <Stack direction="row" spacing={1} alignItems="center">
                <Button
                        variant="outlined"
                        size="large"
                        
                        sx={{ borderRadius: 4 }}
                        onClick={() => setTitle("Messages")}
                    >
                        Messages
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 4 }}
                        onClick={() => setTitle("Voice")}
                    >
                        Voice
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 4 }}
                        onClick={() => setTitle("Invites")}
                    >
                        Invites
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={{ borderRadius: 4 }}
                        onClick={() => setTitle("Karma")}
                    >
                        Karma
                    </Button>
                </Stack>
                <TableContainer
                    component={Paper}
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0)", // Fully opaque white background
                        boxShadow: "none", // Remove the shadow
                        overflow: "hidden",
                    }}
                    height="100%"
                    
                >
                        <Table
                            sx={{
                                width: "100%",
                                tableLayout: "fixed",
                                backgroundColor: "rgba(255, 255, 255, 0)", // Fully opaque white background
                                '& .MuiTableCell-root': {
                                    borderBottom: 'none', // Remove borders on rows
                                },
                                border: "none",
                                boxShadow: "none",
                            }}
                            aria-label="simple table"
                            size="small"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>User</TableCell>
                                    <TableCell>{title}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        key={row.key}
                                        component={Link} to={`${row.key}`}
                                        sx={{
                                        transition: "background-color 0.3s ease",
                                        textDecoration: "none",
                                        '&:hover': {
                                            backgroundColor: "#f5f5f5", // Grey background on hover
                                        },
                                        }} // Apply the CSS class here
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.avatar ? 
                                            (
                                            <img src={"https://cdn.discordapp.com/avatars/"+row.key+"/"+row.avatar+".jpg"} alt="Avatar" style={{height: "30px", borderRadius: "50%"}} />
                                            ) : (
                                            <AccountCircleRoundedIcon fontSize="large" sx={{color: "#424549"}}/>
                                            )}
                                        </TableCell>
                                        <TableCell align="left">{row.username}</TableCell>
                                        <TableCell align="left">{row.data}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TableFooter>
                            <TablePagination
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            labelRowsPerPage="" // Set this to an empty string to remove the label
                            rowsPerPageOptions={[]} // Set this to an empty array to remove the selector
                            onPageChange={handleChangePage}
                            ActionsComponent={TablePaginationActions}
                            />
                        
                        </TableFooter>
                </TableContainer>
            </Stack>
        </Box>
    );
};

export default BrTable;
