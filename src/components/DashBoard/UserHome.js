import React from 'react';
import { Typography, Box, Grid, Container, Card, CardContent, CardMedia, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { styled } from '@mui/material/styles';

// Sample real estate images
import estateImage1 from '../../images/admin1.png';
import estateImage2 from '../../images/admin2.png';
import estateImage3 from '../../images/admin3.png';
import villa from '../../images/villa.png';
import urban from '../../images/urban.png';
import modern from '../../images/modern.png';

const StyledCard = styled(Card)(({ theme }) => ({
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: theme.shadows[6],
    },
}));

const UserHome = ({ user, isSubscribed }) => {
    const firstName = user?.userDetails?.userdetailsFirstName || 'User';

    const carouselItems = [
        {
            image: villa,
            title: 'Luxurious Villas',
            description: 'Find luxurious villas with stunning architecture and scenic views.',
        },
        {
            image: modern,
            title: 'Modern Apartments',
            description: 'Explore modern apartments in prime locations with the best amenities.',
        },
        {
            image: urban,
            title: 'Urban Living',
            description: 'Experience urban living with our top-tier real estate listings.',
        },
    ];

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                            Welcome, <Box component="span" sx={{ color: 'blue' }}>{firstName}!</Box>
                        </Typography>

                        {isSubscribed ? (
                            <Typography variant="h6" color="primary">You are subscribed.</Typography>
                        ) : (
                            <Typography variant="h6" color="error">You are not subscribed.</Typography>
                        )}
                        <Typography variant="body1" style={{ marginTop: '20px' }}>
                            Explore the best real estate listings, including luxurious villas, modern apartments, and urban living spaces. Our platform provides everything you need to find your dream home or investment property.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                    {/* Smaller Carousel */}
                    <Carousel interval={3000} animation="slide" indicators={false} navButtonsAlwaysVisible={true}>
                        {carouselItems.map((item, index) => (
                            <Paper key={index} elevation={4}>
                                <CardMedia
                                    component="img"
                                    height="200" // Smaller height for carousel
                                    image={item.image}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        ))}
                    </Carousel>
                </Grid>
            </Grid>

            {/* Additional Real Estate Info Section */}
            <Grid container spacing={4} style={{ marginTop: '40px' }}>
                {/* First Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="200"
                            image={estateImage1}
                            alt="Real Estate Tips"
                        />
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Real Estate Tips
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                                Get insights on buying and selling properties, and stay updated with the latest trends.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Second Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="200"
                            image={estateImage2}
                            alt="Mortgage Assistance"
                        />
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Mortgage Assistance
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                                Learn about mortgage plans, home loans, and financial support for your dream home.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>

                {/* Third Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardMedia
                            component="img"
                            height="200"
                            image={estateImage3}
                            alt="Property Management"
                        />
                        <CardContent>
                            <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                Property Management
                            </Typography>
                            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                                Efficiently manage your properties with our expert tips and resources.
                            </Typography>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserHome;
