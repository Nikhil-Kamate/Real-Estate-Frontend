import React, { useState } from 'react';
import { AppBar, Typography, Button, Grid, Box, Avatar, Badge, Divider } from '@mui/material';
import AddState from '../Location/AddState';
import ViewState from '../Location/ViewState';
import AddCity from '../Location/AddCity';
import { LocationCity, Visibility, AddLocation, Home, Help, Logout, List } from '@mui/icons-material';
import AdminHeader from '../Header/AdminHeader';
import PropertyCard from '../PropertyDisplay/PropertyCard';
import { styled } from '@mui/material/styles';
import image from '../../images/person.png';
import BrokerTable from '../Login/BrokerTable';
import { Link } from 'react-router-dom';
import AdminHome from './AdminHome';

// StyledBadge setup
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [isAddStateDialogOpen, setIsAddStateDialogOpen] = useState(false);
  const [isViewStateDialogOpen, setIsViewStateDialogOpen] = useState(false);
  const [isAddCityDialogOpen, setIsAddCityDialogOpen] = useState(false);

  const handleMenuClick = (component) => {
    if (component === 'addState') {
      setIsAddStateDialogOpen(true);
    } else if (component === 'viewStates') {
      setIsViewStateDialogOpen(true);
    } else if (component === 'addCity') {
      setIsAddCityDialogOpen(true);
    } else {
      setSelectedComponent(component);
    }
  };

  const renderContent = () => {
    switch (selectedComponent) {
      case 'home':
        return <AdminHome/>;
      case 'addProperty':
        return <PropertyCard />;
      case 'brokerList':
        return <BrokerTable />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <AdminHeader />
      </AppBar>

      <Grid container style={{ marginTop: '64px' }}>
        <Grid
          item
          xs={2}
          style={{
            backgroundColor: '#f4f4f4',
            height: '100vh',
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '16.6666%',
            zIndex: 1200,
            overflow: 'hidden',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="User Avatar" src={image} />
            </StyledBadge>
            <Typography variant="h6" style={{ marginLeft: '10px' }}>
              {user?.userDetails?.userdetailsFirstName || 'Admin'}
            </Typography>
          </Box>
          <Divider style={{ margin: '20px 0' }} />
          <Box mt={4} display="flex" flexDirection="column" alignItems="center" paddingLeft={4} marginTop={-1}>
            <Button
              startIcon={<Home />}
              onClick={() => handleMenuClick('home')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Home
            </Button>
            <Button
              startIcon={<AddLocation />}
              onClick={() => handleMenuClick('addState')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Add State
            </Button>
            <Button
              startIcon={<Visibility />}
              onClick={() => handleMenuClick('viewStates')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              View States
            </Button>
            <Button
              startIcon={<LocationCity />}
              onClick={() => handleMenuClick('addCity')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Add City
            </Button>
            <Button
              startIcon={<Home />}
              onClick={() => handleMenuClick('addProperty')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Property
            </Button>
            {/* Add Broker List Menu */}
            <Button
              startIcon={<List />}
              onClick={() => handleMenuClick('brokerList')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Broker List
            </Button>
          </Box>

          {/* Footer Section */}
          <Divider style={{ margin: '290px 0' }} />
          <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={5} mt={2} style={{ position: 'absolute', bottom: 70 }}>
           <Link to ="/login">
            <Button
              startIcon={<Logout />}
              onClick={() => console.log('Logout clicked')}
              style={{ justifyContent: 'flex-start', width: '100%' }}
            >
              Logout
            </Button></Link>
          </Box>
        </Grid>

        <Grid
          item
          xs={10}
          style={{
            padding: '20px',
            marginLeft: '16.6666%',
            width: '83.3333%',
          }}
        >
          {renderContent()}
          <AddState
            open={isAddStateDialogOpen}
            handleClose={() => setIsAddStateDialogOpen(false)}
          />
          <ViewState
            open={isViewStateDialogOpen}
            handleClose={() => setIsViewStateDialogOpen(false)}
          />
          <AddCity
            open={isAddCityDialogOpen}
            handleClose={() => setIsAddCityDialogOpen(false)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
