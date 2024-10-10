import React from 'react';
import { Container, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './landingpage.css';
import logo from './../../src/images/logo.png'; // Adjust the path for your logo
import heroImage from './../../src/images/heade.png'; // Replace with your hero image
import rightImage from './../../src/images/body.png';
import sideImage from './../../src/images/rightimage.png'; // Replace with your side image
import image1 from './../../src/images/r1.png';
import image2 from './../../src/images/r2.png';
import image3 from './../../src/images/r3.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

const LandingPage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero-image">
                <img src={heroImage} alt="Hero" className="hero-img" />
                <img src={logo} alt="Logo" className="logo" />
                <img src={rightImage} alt="Right Side" className="right-image" />
            </div>

            {/* Buttons and Side Image Section */}
            <div className="content-section">
                <Container className="button-section">
                    <Grid container alignItems="center">
                        <Grid item md={6} className="left-side">
                            <Typography variant="body1" sx={{ color: 'grey', marginBottom: 1,marginTop:-6 }}>
                                SELL OR RENT YOUR PROPERTY
                            </Typography>
                            <Typography variant="h4" component="h1" sx={{ marginBottom: 1 }}>
                              <b>Register to Post your Property for <span style={{ color: 'green' }}>FREE</span></b>  
                            </Typography>
                            <br></br>
                            <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                Post your residential / commercial property
                            </Typography>
                            <Link to="/login">
                                <Button variant="contained" color="primary" className="me-3" sx={{ height: '50px' }}>
                                    Post Your Property for Free  
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item md={6} className="right-side">
                            <img src={sideImage} alt="Side" className="side-img" />
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* Cards Section */}
            <div className="cards-section">
                <Container className="my-5">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={image1}
                                        alt="Luxury Villa"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Luxury Villa
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Experience the elegance of a luxury villa in the heart of the city, featuring spacious living areas and stunning finishes. Enjoy the perfect blend of urban convenience and tranquil retreat.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Link to="/login"><Button size="small" color="primary">View Details</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={image2}
                                        alt="Cozy Apartment"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Cozy Apartment
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Our cozy apartments offer a warm, inviting atmosphere with modern amenities. Perfectly located, they provide easy access to city life while ensuring a peaceful home environment.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Link to="/login"> <Button size="small" color="primary">View Details</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={image3}
                                        alt="Modern Office Space"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Land
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Discover prime land ideal for your dream project, surrounded by natural beauty and essential services. This perfect canvas offers great potential in a thriving location.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                <Link to="/login"> <Button size="small" color="primary">View Details</Button></Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* Add space between cards and footer */}
            <br /><br />

            {/* Footer */}
            <footer className="footer">
                <Typography variant="body2" className="footer-text">
                    &copy; {new Date().getFullYear()} Real Estate. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
};

export default LandingPage;
