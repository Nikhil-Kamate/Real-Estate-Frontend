import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';
import Image from '../../images/logo.png';
import Logout from '../Login/Logout';
import { Link } from 'react-router-dom';


const AdminHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#132435' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to ="/"><img
            src={Image}
            alt="Logo"
            style={{ height: '40px', marginRight: '10px', marginTop: '-10%' }} // Adjust height as needed
          /></Link> 
        </Box>
        <div>
          {/* Use the LogoutComponent here */}
          <Logout/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
