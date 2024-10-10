import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box, Paper, Alert } from "@mui/material";
import MainHeader from "../Header/MainHeader";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Footer/Footer";

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [validationMsg, setValidationMsg] = useState({
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        password: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userDetails = {
            userdetailsFirstName: firstName,
            userLastName: lastName,
            userPhoneNo: phoneNo,
        };

        const userAuth = {
            email: email,
            password: password,
        };

        const registrationData = {
            userDetails,
            userAuth,
        };

        try {
            await axios.post('http://localhost:8080/keyvista/api/users/register', registrationData);
            setSuccess(true);
            setError(null);
            setFirstName('');
            setLastName('');
            setPhoneNo('');
            setEmail('');
            setPassword('');

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            setSuccess(false);
        }
    };

    const validateFirstName = (value) => {
        if (value.length < 3 || value.length > 20) {
            setValidationMsg((prev) => ({ ...prev, firstName: 'First Name must be between 3 to 20 characters.' }));
        } else {
            setValidationMsg((prev) => ({ ...prev, firstName: '' }));
        }
    };

    const validateLastName = (value) => {
        if (value.length < 3 || value.length > 20) {
            setValidationMsg((prev) => ({ ...prev, lastName: 'Last Name must be between 3 to 20 characters.' }));
        } else {
            setValidationMsg((prev) => ({ ...prev, lastName: '' }));
        }
    };

    const validatePhoneNo = (value) => {
        const phonePattern = /^[6-9][0-9]{9}$/;
        if (!phonePattern.test(value)) {
            setValidationMsg((prev) => ({ ...prev, phoneNo: 'Phone number must start with [6-9] and be 10 digits.' }));
        } else {
            setValidationMsg((prev) => ({ ...prev, phoneNo: '' }));
        }
    };

    const validateEmail = (value) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const localPart = value.split('@')[0];
    
        if (localPart.length > 20) {
            setValidationMsg((prev) => ({ ...prev, email: 'Local part of email must be max 20 characters before @domain.com.' }));
        } else if (!emailPattern.test(value)) {
            setValidationMsg((prev) => ({ ...prev, email: 'Invalid email format. Please use a valid domain like @gmail.com, @yahoo.com.' }));
        } else {
            setValidationMsg((prev) => ({ ...prev, email: '' }));
        }
    }; 
    
    const validatePassword = (value) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(value)) {
            setValidationMsg((prev) => ({
                ...prev,
                password: 'Password must have at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
            }));
        } else {
            setValidationMsg((prev) => ({ ...prev, password: '' }));
        }
    };

    useEffect(() => {
        if (
            firstName.length >= 3 && firstName.length <= 20 &&
            lastName.length >= 3 && lastName.length <= 20 &&
            /^[6-9][0-9]{9}$/.test(phoneNo) &&
            /^[a-zA-Z0-9._%+-]{1,20}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)  &&
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
        ) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [firstName, lastName, phoneNo, email, password]);

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <MainHeader />
            <Grid container spacing={0} style={{ flex: 1 }}>
                {/* Left Side - Real Estate Insights */}
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        height="100%"
                        padding={4}
                        marginTop={-5}
                        marginLeft={10}
                        sx={{ textAlign: 'left' }}
                    >
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                         💼 Explore diverse investment options that can maximize your returns and diversify your portfolio.
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                        🏡 Discover expert tips for first-time home buyers, from securing financing to closing the deal.
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                        📍 Get in-depth insights about neighborhoods to find the perfect community for your lifestyle.
                        </Typography>
                        <br />
                        <Typography variant="body1" sx={{ fontSize: '18px', marginBottom: '20px' }}>
                        🔑 Learn about efficient property management practices to maintain and increase the value of your investments.
                        </Typography>
                    </Box>
                </Grid>

                {/* Right Side - Register Form inside a box */}
                <Grid item xs={12} sm={6}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="100%"
                        padding={4}
                    >
                        <Paper elevation={3} style={{ padding: "40px", backgroundColor: "#f9f9f9", width: "100%", maxWidth: "400px" }}>
                            <Typography variant="h4" gutterBottom align="center">
                                <b>Sign up</b>
                            </Typography>

                            {error && (
                                <Alert severity="error" style={{ marginBottom: "16px" }}>
                                    {error}
                                </Alert>
                            )}
                            {success && (
                                <Alert severity="success" style={{ marginBottom: "16px" }}>
                                    Registration successful! Redirecting to login...
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    id="firstName"
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={firstName}
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                        validateFirstName(e.target.value);
                                    }}
                                    error={Boolean(validationMsg.firstName)}
                                    helperText={validationMsg.firstName}
                                    inputProps={{ maxLength: 20 }}
                                    required
                                />
                                <TextField
                                    id="lastName"
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={lastName}
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                        validateLastName(e.target.value);
                                    }}
                                    error={Boolean(validationMsg.lastName)}
                                    helperText={validationMsg.lastName}
                                    inputProps={{ maxLength: 20 }}
                                    required
                                />
                                <TextField
                                    id="phoneNo"
                                    label="Phone No"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={phoneNo}
                                    onChange={(e) => {
                                        setPhoneNo(e.target.value);
                                        validatePhoneNo(e.target.value);
                                    }}
                                    error={Boolean(validationMsg.phoneNo)}
                                    helperText={validationMsg.phoneNo}
                                    inputProps={{ maxLength: 10 }}
                                    required
                                    InputProps={{
                                        startAdornment: <Typography>+91 </Typography>
                                    }}
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    error={Boolean(validationMsg.email)}
                                    helperText={validationMsg.email}
                                    required
                                />
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    error={Boolean(validationMsg.password)}
                                    helperText={validationMsg.password}
                                    required
                                />

                                <Box marginTop={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        fullWidth
                                        disabled={!isFormValid}
                                    >
                                        SIGN UP
                                    </Button>
                                </Box>
                                <Box marginTop={3} textAlign="center">
                                    <Typography variant="body2">
                                        Already have an account? <Link to="/login"> Sign in</Link>
                                    </Typography>
                                </Box>
                            </form>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </Box>
    );
};

export default Registration;
