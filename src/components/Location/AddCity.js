import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import { Typography } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddCity = ({ open, handleClose }) => {
  const [cityName, setCityName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState([]);
  const [error, setError] = useState({ cityName: false, selectedState: false });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch the list of states when the component loads
  useEffect(() => {
    if (open) {
      axios.get('http://localhost:8080/keyvista/api/locations/states')
        .then(response => {
          setStates(response.data);
        })
        .catch(error => {
          alert('Error fetching states');
          console.error(error);
        });
    }
  }, [open]); // Fetch the states when the dialog is open

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleValidation = () => {
    setError({
      cityName: cityName === '',
      selectedState: selectedState === ''
    });
  };

  const handleAddCity = (event) => {
    event.preventDefault();
    const newCity = { name: cityName, stateName: selectedState };

    axios.post('http://localhost:8080/keyvista/api/locations/cities', newCity)
      .then(response => {
        setSnackbarOpen(true); // Show success message
        setCityName('');
        setSelectedState('');
        handleClose();
      })
      .catch(error => {
        alert('Error adding city');
        console.error(error);
      });
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    if (event.target.value !== '') {
      setError(prevError => ({ ...prevError, selectedState: false }));
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleAddCity,
          style: { minWidth: '500px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
            Add a New City
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the city name and select a state to add a new city.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            id="city-name"
            name="cityName"
            label="City Name"
            variant="outlined"
            fullWidth
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            onBlur={handleValidation}
            error={error.cityName}
            helperText={error.cityName ? 'City Name is required' : ''}
          />

          <FormControl 
            fullWidth 
            required 
            variant="outlined" 
            style={{ marginTop: '20px' }} 
            error={error.selectedState}
          >
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="state-select"
              value={selectedState}
              onChange={handleStateChange}
            >
              {states.map(state => (
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
            {error.selectedState && <FormHelperText>State is required</FormHelperText>}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={cityName === '' || selectedState === ''}>Add City</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          City added successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AddCity;
