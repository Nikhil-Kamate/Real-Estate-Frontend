import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Box, Paper, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import MainHeader from "../Header/MainHeader";
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();     
        const requestData = { email, password };
        console.log("Login request data:", requestData);
        setError("");
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8080/keyvista/api/users/login', requestData);
            localStorage.setItem('user', JSON.stringify(response.data)); // Save full user data

            const userRole = response.data.userRole;
            const ownerId = response.data.userDetails.userdetailsId; // Use userdetailsId here
            localStorage.setItem('ownerId', ownerId);

            // Redirect based on user role
            if (userRole === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Space for Header Component */}
            <Box>
                <MainHeader />
            </Box>

            <Grid container spacing={0} style={{ height: "80vh" }}>
                {/* Left side - Plain content */}
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        height="100%"
                        padding={4}
                        marginLeft={10}
                        sx={{ textAlign: 'left' }} // Ensure content is left-aligned
                    >

                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                            💼 Explore diverse investment options that can maximize your returns and diversify your portfolio.
                        </Typography>
                        <br></br>
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                            🏡 Discover expert tips for first-time home buyers, from securing financing to closing the deal.
                        </Typography>
                        <br></br>
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                            📍 Get in-depth insights about neighborhoods to find the perfect community for your lifestyle.
                        </Typography>
                        <br></br>
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                            🔑 Learn about efficient property management practices to maintain and increase the value of your investments.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right side - Login Form inside a box */}
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        padding={4}
                    >
                        {/* Dimmed Container for login form */}
                        <Paper elevation={3} style={{ padding: "40px", backgroundColor: "#f9f9f9", height: "350px", width: "100%", maxWidth: "400px" }}>
                            <Typography variant="h4" gutterBottom align="center">
                                <b> Sign in </b>
                            </Typography>

                            {/* Display the error if it exists */}
                            {error && (
                                <Alert severity="error" style={{ marginBottom: "16px" }}>
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <Box marginTop={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={loading}
                                    >
                                        {loading ? "Logging in..." : "Sign in"}
                                    </Button>
                                </Box>
                                <Box marginTop={3} textAlign="center">
                                    <Typography variant="body2">
                                        Don't have an account? <Link to="/registration">Sign up</Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Footer/>
        </>
    );
};

export default LoginComponent;
