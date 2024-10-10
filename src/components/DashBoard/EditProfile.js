import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // For making API calls

const EditProfile = ({ open, handleClose, userDetails, userAuth, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    userdetailsId: userDetails?.userdetailsId || '', // Ensure userdetailsId is passed
    firstName: userDetails?.userdetailsFirstName || '',
    lastName: userDetails?.userLastName || '',
    phoneNo: userDetails?.userPhoneNo || '',
    email: userAuth?.email || '', // Fetch email from userAuth
    password: '', // Leave password empty initially
  });

  const [errorMessage, setErrorMessage] = useState(''); // State to track error message

  useEffect(() => {
    // Update formData when the userAuth or userDetails changes
    setFormData({
      userdetailsId: userDetails?.userdetailsId || '',
      firstName: userDetails?.userdetailsFirstName || '',
      lastName: userDetails?.userLastName || '',
      phoneNo: userDetails?.userPhoneNo || '',
      email: userAuth?.email || '', // Update email if it changes
      password: '', // Reset password field to empty
    });
  }, [userDetails, userAuth]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Reset error message before making the API call
      setErrorMessage('');

      // Make an API request to update the profile
      const response = await axios.put(`http://localhost:8080/keyvista/api/users/edit-profile`, formData);
      if (response.status === 200) {
        onUpdateSuccess(response.data); // Update user data on success
        handleClose();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle error and display message
        setErrorMessage(error.response.data.message || 'Error updating profile.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errorMessage && errorMessage.includes('Email')} // Highlight email field if there's an email-related error
            helperText={errorMessage && errorMessage.includes('Email') ? errorMessage : ''} // Display email-related error message
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            helperText="Leave blank if you don't want to change the password"
          />
          {/* Display general error message */}
          {errorMessage && !errorMessage.includes('Email') && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
