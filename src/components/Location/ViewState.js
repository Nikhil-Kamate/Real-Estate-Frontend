import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const ViewState = ({ open, handleClose }) => {
  const [states, setStates] = useState([]);

  // Fetch states when the dialog opens
  React.useEffect(() => {
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
  }, [open]); // Re-fetch data whenever the dialog is opened

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" align="center" style={{ fontWeight: 'bold' }}>
          State List
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {states.length > 0 ? (
          <List>
            {states.map(state => (
              <ListItem key={state.id}>
                <ListItemText primary={state.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No states available
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewState;
