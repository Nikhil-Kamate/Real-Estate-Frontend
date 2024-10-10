import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Container, Grid, Card, CardContent } from '@mui/material';
import Image from '../../images/logo.png';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  // State to manage the dialog open/close
  const [openAboutUs, setOpenAboutUs] = useState(false);
  const [openContactUs, setOpenContactUs] = useState(false);

  const handleOpenAboutUs = () => {
    setOpenAboutUs(true);
  };

  const handleCloseAboutUs = () => {
    setOpenAboutUs(false);
  };

  const handleOpenContactUs = () => {
    setOpenContactUs(true);
  };

  const handleCloseContactUs = () => {
    setOpenContactUs(false);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#132435' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <img
                src={Image}
                alt="Logo"
                style={{ height: '40px', marginRight: '10px', marginTop: '-10%' }}
              />
            </Link>
            <Typography variant="h6"></Typography>
          </Box>
          <div>
            <Button
              color="inherit"
              sx={{ marginLeft: '20px' }}
              onClick={handleOpenAboutUs} // Open About Us dialog
            >
              About Us
            </Button>
            <Button
              color="inherit"
              sx={{ marginLeft: '20px' }}
              onClick={handleOpenContactUs} // Open Contact Us dialog
            >
              Contact Us
            </Button>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{ marginLeft: '20px' }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/registration"
              color="inherit"
              sx={{ marginLeft: '20px' }}
            >
              Sign Up
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* About Us Dialog Popup */}
      <Dialog open={openAboutUs} onClose={handleCloseAboutUs} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            About Us
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '40px' }}>
              Welcome to our Real Estate Application! We provide a platform that connects homebuyers, sellers, and real estate professionals to make the process of finding and managing properties seamless.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Our Mission
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '10px' }}>
                      To revolutionize the real estate industry by providing a user-friendly platform that simplifies the buying, selling, and renting of properties. We aim to empower our users by offering tools that help them make informed decisions.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Our Vision
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '10px' }}>
                      To be the leading real estate platform by continuously innovating and providing cutting-edge solutions that transform the property market experience.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Our Values
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '10px' }}>
                      Integrity, customer satisfaction, and innovation are at the heart of everything we do. We strive to provide a trustworthy platform where users feel secure in making life-changing decisions.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAboutUs} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contact Us Dialog Popup */}
      <Dialog open={openContactUs} onClose={handleCloseContactUs} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Contact Us
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container sx={{ marginTop: '40px' }}>
            <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
              Have questions? Reach out to us, and we will be happy to assist you. Below are the contact details.
            </Typography>

            <Grid container spacing={4}>
              {/* Email Information */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                      Contact Details
                    </Typography>
                    <Typography variant="body1">
                      Email us at: <br />
                      <strong>nikhil.kamate115@gmail.com</strong><br />
                      <strong>realestate.support@gmail.com</strong>
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '20px' }}>
                      Our team is here to assist you with any queries you may have about our platform. We strive to respond within 24 hours on business days.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContactUs} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainHeader;
