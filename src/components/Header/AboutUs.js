import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const AboutUs = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Button to open the About Us dialog */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        About Us
      </Button>

      {/* About Us Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
              {/* Mission Card */}
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

              {/* Vision Card */}
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

              {/* Our Values */}
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
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AboutUs;
