import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardMedia, Typography, CardActions, Button, Grid,
  FormControl, InputLabel, Select, MenuItem, CircularProgress, Box, Chip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PropertyDetailsDialog from './PropertyDetailsDialog';

const PropertyCard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [bhkFilter, setBhkFilter] = useState('All');
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8080/keyvista/api/propertydisplay/all');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Error fetching properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleApprove = async () => {
    try {
      await axios.post(`http://localhost:8080/keyvista/api/propertydisplay/approve/${selectedPropertyId}`);
      setProperties(properties.map(property =>
        property.propertyId === selectedPropertyId ? { ...property, approvalStatus: 'Approved' } : property
      ));
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Error approving property:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post(`http://localhost:8080/keyvista/api/propertydisplay/reject/${selectedPropertyId}`);
      setProperties(properties.map(property =>
        property.propertyId === selectedPropertyId ? { ...property, approvalStatus: 'Rejected' } : property
      ));
      handleCloseConfirmDialog();
    } catch (error) {
      console.error('Error rejecting property:', error);
    }
  };

  const handleViewClick = async (propertyId) => {
    try {
      const response = await axios.get(`http://localhost:8080/keyvista/api/propertydisplay/property/details/${propertyId}`);
      setSelectedPropertyDetails(response.data);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPropertyDetails(null);
  };

  const handleOpenConfirmDialog = (action, id) => {
    setConfirmAction(action);
    setSelectedPropertyId(id);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setConfirmAction(null);
    setSelectedPropertyId(null);
  };

  const getCardColor = (listingType) => {
    return listingType === 'Rent' ? '#e0f7fa' : '#fce4ec'; // Light cyan for Rent and light pink for Sell
  };

  const filteredProperties = properties.filter(property => {
    const statusMatch = statusFilter === 'All' || property.approvalStatus === statusFilter;
    const bhkMatch = bhkFilter === 'All' || property.bhkType === bhkFilter;
    return statusMatch && bhkMatch;
  });

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ px: 2 }}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Filter by Status</Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Filter by BHK Type</Typography>
          <FormControl fullWidth size="small">
            <InputLabel>BHK</InputLabel>
            <Select
              value={bhkFilter}
              onChange={(e) => setBhkFilter(e.target.value)}
              label="BHK"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1RK">1RK</MenuItem>
              <MenuItem value="1BHK">1BHK</MenuItem>
              <MenuItem value="2BHK">2BHK</MenuItem>
              <MenuItem value="3BHK">3BHK</MenuItem>
              <MenuItem value="4BHK">4BHK</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
              <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 3, backgroundColor: getCardColor(property.listingType) }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:8080/keyvista/static/uploads/${property.propertyimagePath}`}
                  alt={property.propertyType}
                />
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={property.listingType} color="primary" />
                    <Chip
                      label={property.approvalStatus}
                      color={property.approvalStatus === 'Approved' ? 'success' : property.approvalStatus === 'Rejected' ? 'error' : 'default'}
                    />
                  </Box>
                  <Typography variant="h6">{property.propertyType}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>BHK Type:</strong> {property.bhkType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Built-Up Area:</strong> {property.builtUpArea} sq. ft.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>List As:</strong> {property.listAs}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => handleOpenConfirmDialog('approve', property.propertyId)}
                    size="small"
                    color="primary"
                    variant="contained"
                    disabled={property.approvalStatus === 'Approved' || property.approvalStatus === 'Rejected'} // Disable if status is Approved or Rejected
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleOpenConfirmDialog('reject', property.propertyId)}
                    size="small"
                    color="error"
                    variant="contained"
                    disabled={property.approvalStatus === 'Approved' || property.approvalStatus === 'Rejected'} // Disable if status is Approved or Rejected
                  >
                    Reject
                  </Button>
                  <Button onClick={() => handleViewClick(property.propertyId)} size="small" variant="outlined">
                    View
                  </Button>
                </CardActions>

              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No properties available.</Typography>
        )}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>{confirmAction === 'approve' ? 'Approve Property' : 'Reject Property'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmAction === 'approve'
              ? 'Are you sure you want to approve this property?'
              : 'Are you sure you want to reject this property?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
          <Button
            onClick={confirmAction === 'approve' ? handleApprove : handleReject}
            color="primary"
          >
            {confirmAction === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for property details */}
      {selectedPropertyDetails && (
        <PropertyDetailsDialog
          open={dialogOpen}
          handleClose={handleCloseDialog}
          propertyDetails={selectedPropertyDetails}
        />
      )}
    </Box>
  );
};

export default PropertyCard;
