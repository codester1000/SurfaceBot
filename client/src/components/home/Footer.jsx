import React, { useState } from 'react';
import { Stack, Typography, Grid, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const [isButtonHovered, setIsButtonHovered] = useState(false); // Added state for hover

    const footerStyle = {
        padding: '16px',
        width: '100%',
        color: '#333',
        fontFamily: "'PT Sans Caption', sans-serif",
    };

    const buttonStyle = {
        boxShadow: 'none',
        outline: 'none',
        textTransform: 'lowercase',
        fontFamily: "'PT Sans Caption', sans-serif",
        fontSize: 16,
        background: 'transparent', // Remove background color
        transition: 'transform 0.2s ease', // Add transition for the button's transform property
        color: isButtonHovered ? "#5dab3e" : 'inherit', // Change color on hover
        transform: isButtonHovered ? 'translateY(-5px)' : 'none', // Move button up on hover
    };

    return (
        <footer style={footerStyle}>
            <Grid container alignItems="center" paddingX={10} paddingBottom={2}>
                <Grid item sm={4}>
                    <img src="/SurfaceBot.svg" alt="SurfaceBot Logo" style={{ height: "80px" }} />
                </Grid>
                <Grid item sm={4}>
                    
                </Grid>
                <Grid item sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant="body2" fontFamily="'PT Sans Caption', sans-serif" style={{ marginRight: 8 }}>Powered by:</Typography>
                    <a href="http://decodes.ai">
                        <img src="/decodeslong.svg" alt="Powered by Logo" style={{ height: "50px" }} />
                    </a>
                </Grid>
            </Grid>
            <div style={{ position: 'relative', minHeight: '100%' }}>
                <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)' }}>
                    <Button
                        onClick={handleScrollToTop}
                        variant="contained"
                        color="primary"
                        style={buttonStyle}
                        onMouseEnter={() => setIsButtonHovered(true)} // Set hover state to true
                        onMouseLeave={() => setIsButtonHovered(false)} // Set hover state to false
                    >
                        <KeyboardArrowUpIcon />
                    </Button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

