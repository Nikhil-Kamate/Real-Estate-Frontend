import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all user-related data from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('ownerId');
        
        // Redirect to login page
        navigate('/login');
    };

    return (
        <Button onClick={handleLogout} color="inherit">
            Logout
        </Button>
    );
};

export default Logout;
