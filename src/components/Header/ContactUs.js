import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const ContactUs = () => {
  return (
    <Container sx={{ marginTop: '40px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
        Contact Us
      </Typography>

      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Have questions? Reach out to us, and we will be happy to assist you. You can email us directly at the contact details below.
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
                Our team is available to help you with any queries regarding our real estate services, from property listings to customer support. We aim to respond to all inquiries within 24 hours.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
