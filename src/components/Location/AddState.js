import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddState = ({ open, handleClose }) => {
  const [stateName, setStateName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleAddState = (event) => {
    event.preventDefault();
    if (stateName === '') {
      setError(true);
      return;
    }

    axios.post('http://localhost:8080/keyvista/api/locations/states', { name: stateName })
      .then(() => {
        setSnackbarOpen(true);
        setStateName('');
        handleClose();
      })
      .catch(error => {
        alert('Error adding state');
        console.error(error);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleStateNameChange = (e) => {
    setStateName(e.target.value);
    if (e.target.value !== '') {
      setError(false);
    }
  };

  return (
    <React.Fragment>
      {/* Dialog (Popup) */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleAddState,
          style: { minWidth: '500px' }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
            Add a New State
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="state-name"
            name="stateName"
            label="State Name"
            variant="outlined"
            fullWidth
            value={stateName}
            onChange={handleStateNameChange}
            error={error}
            helperText={error ? 'State Name is required' : ''}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={stateName === ''}>Add State</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          State added successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default AddState;
