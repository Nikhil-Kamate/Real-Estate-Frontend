import React, { useState, useEffect } from 'react';
import {
  AppBar, Typography, Button, Grid, Box, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Avatar, Badge, Divider
} from '@mui/material';
import { Home, ViewList, AddBusiness, House, Visibility, MonetizationOn, Logout, Edit } from '@mui/icons-material';
import UserHeader from '../Header/AdminHeader';
import SellProperty from '../ListProperty/SellProperty';
import RentProperty from '../ListProperty/RentProperty';
import OwnerListedProp from '../PropertyDisplay/OwnerListedProp';
import ApprovedPropertyCard from '../PropertyDisplay/ApprovedPropertyCard';
import PaymentComponent from '../Payment/PaymentComponent';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import BrokerForm from '../Login/BrokerForm';
import UserHome from './UserHome';
import EditProfile from './EditProfile'; // Importing the EditProfile component
import axios from 'axios';  // Import axios for making API calls

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

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const ownerId = user?.userDetails?.userdetailsId;
  const userAuth = user?.userAuth; // Assuming this is being stored correctly in localStorage
  const navigate = useNavigate();

  const firstLetter = user?.userDetails?.userdetailsFirstName?.charAt(0).toUpperCase() || 'U';
  const [isSubscribed, setIsSubscribed] = useState(user?.userDetails?.isSubscribed || false);
  const [selectedComponent, setSelectedComponent] = useState('home');
  const [showSubscribedDialog, setShowSubscribedDialog] = useState(false);
  const [openBrokerForm, setOpenBrokerForm] = useState(false); // State to control BrokerForm dialog
  const [openEditProfile, setOpenEditProfile] = useState(false); // State to control EditProfile dialog
  const [alreadyRegistered, setAlreadyRegistered] = useState(false); // State for checking broker registration

  // Function to check if the user is already registered as a broker
  const checkBrokerRegistration = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/keyvista/api/brokers/check/${ownerId}`);
      if (response.status === 200) {
        // Check if response contains "No broker found" message
        if (typeof response.data === 'string' && response.data.includes('No broker found')) {
          setAlreadyRegistered(false); // Broker not found, allow registration
        } else {
          setAlreadyRegistered(true); // Broker found, prevent registration
        }
      }
    } catch (error) {
      console.error('Error checking broker registration:', error);
    }
  };

  // This function checks broker registration and opens the broker form or shows the dialog immediately
  const handleOpenBrokerForm = async () => {
    await checkBrokerRegistration(); // Ensure broker registration is checked first
    if (alreadyRegistered) {
      setShowSubscribedDialog(true); // Show dialog if already registered
    } else {
      setOpenBrokerForm(true);  // Open form if not registered
    }
  };

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      setIsSubscribed(updatedUser?.userDetails?.isSubscribed);
    };
    fetchSubscriptionStatus();
  }, [ownerId]);

  const handleSubscriptionSuccess = (newStatus) => {
    setIsSubscribed(newStatus);
    const updatedUser = { ...user, userDetails: { ...user.userDetails, isSubscribed: newStatus } };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleSubscriptionClick = () => {
    if (isSubscribed) {
      setShowSubscribedDialog(true);
    } else {
      setSelectedComponent('subscribe');
    }
  };

  const handleCloseSubscribedDialog = () => {
    setShowSubscribedDialog(false);
  };

  const handleBrokerFormSubmit = () => {
    setOpenBrokerForm(false); // Close the form
    setSelectedComponent('home'); // Navigate to home
    navigate('/'); // Redirect to home (if home route is '/')
  };

  const handleProfileUpdateSuccess = (updatedUserDetails) => {
    const updatedUser = { ...user, userDetails: updatedUserDetails };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setOpenEditProfile(false); // Close the dialog after successful update
  };

  const renderContent = () => {
    switch (selectedComponent) {
      case 'home':
        return <UserHome user={user} isSubscribed={isSubscribed} />;
      case 'viewProperty':
        return <ApprovedPropertyCard />;
      case 'sellProperty':
        return <SellProperty />;
      case 'rentProperty':
        return <RentProperty />;
      case 'viewYourProperty':
        return <OwnerListedProp userId={ownerId} handleBack={() => setSelectedComponent('home')} />;
      case 'subscribe':
        return <PaymentComponent userId={ownerId} onPaymentSuccess={handleSubscriptionSuccess} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <UserHeader />
      </AppBar>

      <Grid container style={{ marginTop: '64px' }}>
        {/* Static Sidebar */}
        <Grid
          item
          xs={2}
          style={{
            backgroundColor: '#f4f4f4',
            height: '100vh',
            position: 'fixed',
            top: '64px',
            left: 0,
            width: '20%', 
            overflow: 'hidden',
            zIndex: 1200,
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" mt={3}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar style={{ backgroundColor: 'Red', color: '#fff' }}>{firstLetter}</Avatar>
            </StyledBadge>
            <Typography variant="h6" style={{ marginLeft: '10px' }}>
              {user?.userDetails?.userdetailsFirstName || 'User'}
            </Typography>
          </Box>
          <Divider style={{ margin: '20px 0' }} />
          <Box mt={4} display="flex" flexDirection="column" alignItems="center" paddingLeft={5} marginTop={-1}>
            <Button
              startIcon={<Home />}
              onClick={() => setSelectedComponent('home')}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Home
            </Button>
            <Button
              startIcon={<ViewList />}
              onClick={() => setSelectedComponent('viewProperty')}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              View Property
            </Button>
            <Button
              startIcon={<AddBusiness />}
              onClick={() => setSelectedComponent('sellProperty')}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Sell Your Property
            </Button>
            <Button
              startIcon={<House />}
              onClick={() => setSelectedComponent('rentProperty')}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Rent Your Property
            </Button>
            <Button
              startIcon={<Visibility />}
              onClick={() => setSelectedComponent('viewYourProperty')}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              View Your Property
            </Button>
            <Button
              startIcon={<MonetizationOn />}
              onClick={handleSubscriptionClick}
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Subscribe
            </Button>
            {/* New Button for Edit Profile */}
            <Button
              startIcon={<Edit />}
              onClick={() => setOpenEditProfile(true)} // Open EditProfile dialog
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Edit Profile
            </Button>
            {/* New Button for Register as Broker */}
            <Button
              startIcon={<AddBusiness />}
              onClick={handleOpenBrokerForm} // Check broker registration before opening form
              style={{ justifyContent: 'flex-start', width: '100%', fontSize: '14px' }}
            >
              Register as Broker
            </Button>
          </Box>

          {/* Footer Section */}
          <Divider style={{ margin: '200px 0' }}  />
          <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={5} mt={2} style={{ position: 'absolute', bottom: 70 }}>
            <Link to="/login">
              <Button
                startIcon={<Logout />}
                onClick={() => console.log('Logout clicked')}
                style={{ justifyContent: 'flex-start', width: '100%' }}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Grid>

        {/* Content Area */}
        <Grid
          item
          xs={10}
          style={{
            padding: '20px',
            marginLeft: '17%', 
            width: '80%', 
          }}
        >
          {renderContent()}
        </Grid>
      </Grid>

      {/* Dialog for Already Registered as Broker */}
      <Dialog open={showSubscribedDialog} onClose={handleCloseSubscribedDialog}>
        <DialogTitle>You have already registered as a broker</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are already registered as a broker. No need to register again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubscribedDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Broker Form */}
      <BrokerForm open={openBrokerForm} handleClose={() => setOpenBrokerForm(false)} onSubmit={handleBrokerFormSubmit} />

      {/* Edit Profile Dialog */}
      <EditProfile
        open={openEditProfile}
        handleClose={() => setOpenEditProfile(false)}
        userDetails={user.userDetails}
        userAuth={userAuth} // Pass userAuth for email and password
        onUpdateSuccess={handleProfileUpdateSuccess}
      />
    </div>
  );
};

export default UserDashboard;
