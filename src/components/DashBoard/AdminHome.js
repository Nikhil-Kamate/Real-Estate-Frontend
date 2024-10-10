import React from 'react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

// Sample real estate images
import estateImage1 from '../../images/admin1.png';
import estateImage2 from '../../images/admin2.png';
import estateImage3 from '../../images/admin3.png';

const AdminHome = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Box sx={{ flexGrow: 1, textAlign: 'center', marginBottom: '40px' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>
          Welcome to the Real Estate Admin Dashboard
        </Typography>
        <Typography variant="body1" style={{ marginTop: '10px' }}>
          Manage all your properties, brokers, and locations efficiently from one place.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* First Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={estateImage1}
              alt="Estate 1"
            />
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Premium Real Estate
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Discover the most luxurious and premium real estate properties available for your clients.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Second Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={estateImage2}
              alt="Estate 2"
            />
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Modern Architecture
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage modern architecture projects that captivate your audience and enhance client satisfaction.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Third Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={estateImage3}
              alt="Estate 3"
            />
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                Urban Spaces
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Explore urban spaces that provide a perfect balance of functionality and aesthetic appeal.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Section */}
      <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          Real Estate Insights
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ marginTop: '10px' }}>
          Track and manage properties efficiently to meet market demands and client expectations.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminHome;
