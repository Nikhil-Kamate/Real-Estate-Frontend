import React from 'react';
import { Typography } from '@mui/material';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <Typography variant="body2" className="footer-text">
                &copy; {new Date().getFullYear()} Real Estate. All rights reserved.
            </Typography>
        </footer>
    );
};

export default Footer;
