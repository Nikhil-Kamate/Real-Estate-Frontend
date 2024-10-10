import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box
} from '@mui/material';
import axios from 'axios';

const BrokerTable = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBrokerId, setSelectedBrokerId] = useState(null);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/keyvista/api/brokers/details');
        setBrokers(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch brokers');
      } finally {
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  const handleApproveClick = (brokerId) => {
    setSelectedBrokerId(brokerId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBrokerId(null);
  };

  const handleConfirmApprove = async () => {
    if (!selectedBrokerId) return;

    try {
      await axios.put(`http://localhost:8080/keyvista/api/brokers/approve/${selectedBrokerId}`);
      setSuccessMessage('Broker approved successfully!');
      const updatedBrokers = brokers.map(broker =>
        broker.brokerId === selectedBrokerId ? { ...broker, status: 'Approved' } : broker
      );
      setBrokers(updatedBrokers);
    } catch (err) {
      setError(err.message || 'Failed to approve broker');
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        Broker List
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>User ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>First Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Last Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Phone No</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Subscribed</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>User Role</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Brokerage Rate</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Brokerage License ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brokers.map((broker, index) => (
                <TableRow
                  key={broker.brokerId}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff', // Alternating row colors
                    '&:hover': { backgroundColor: '#e0f7fa' }, // Hover effect
                    transition: 'background-color 0.3s'
                  }}
                >
                  <TableCell>{broker.userdetailsId}</TableCell>
                  <TableCell>{broker.userdetailsFirstName}</TableCell>
                  <TableCell>{broker.userLastName}</TableCell>
                  <TableCell>{broker.userPhoneNo}</TableCell>
                  <TableCell>{broker.isSubscribed ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{broker.userRole}</TableCell>
                  <TableCell>{broker.brokerageRate}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        color: broker.status === 'Approved' ? 'green' : 'orange',
                        fontWeight: 'bold'
                      }}
                    >
                      {broker.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{broker.brokerageLicenseId}</TableCell>
                  <TableCell>
                    {broker.status === 'Pending' && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                        onClick={() => handleApproveClick(broker.brokerId)}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve this broker?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmApprove} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BrokerTable;
