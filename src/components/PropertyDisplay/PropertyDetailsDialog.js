import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Card, CardContent
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { format } from 'date-fns';

const PropertyDetailsDialog = ({ open, handleClose, propertyDetails }) => {
  const { property, rentalDetails, sellDetails, location } = propertyDetails;
  const isSubscribedColor = property?.owner?.isSubscribed ? 'green' : 'red';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Property Details - {property?.propertyId}</DialogTitle>
      <DialogContent dividers>
        <Box>
          <Grid container spacing={2}>
            {/* Property Overview */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                    Property Overview
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Property Type:</strong> {property?.propertyType}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>BHK Type:</strong> {property?.bhkType}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Built-Up Area:</strong> {property?.builtUpArea} sq. ft.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Status:</strong> {property?.propertyStatus}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Description:</strong> {property?.propertyDescription}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>List As:</strong> {property?.listAs}
                  </Typography>
                  {property?.brokerLicence && (
                    <Typography variant="body1" color="text.secondary">
                      <strong>Broker Licence:</strong> {property?.brokerLicence}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Owner Information and Approval Status */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                    Owner Information
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Owner:</strong> {property?.owner?.userdetailsFirstName} {property?.owner?.userLastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                    {property?.owner?.userPhoneNo}
                  </Typography>
                  <Typography variant="body1" color={isSubscribedColor}>
                    <strong>Subscribed:</strong> {property?.owner?.isSubscribed ? 'Yes' : 'No'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <ApartmentIcon fontSize="small" sx={{ mr: 1 }} />
                    Approval Status
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Approval Status:</strong> {property?.approvalStatus}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>List As:</strong> {property?.listAs}
                  </Typography>
                  {property?.brokerLicence && (
                    <Typography variant="body1" color="text.secondary">
                      <strong>Broker License:</strong> {property?.brokerLicence}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Amenities and Sell Details */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <ApartmentIcon fontSize="small" sx={{ mr: 1 }} />
                    Amenities
                  </Typography>
                  {property?.amenities && property.amenities.length > 0 ? (
                    <ul>
                      {property.amenities.map((amenity, index) => (
                        <li key={index}>
                          <Typography variant="body1" color="text.secondary">
                            {amenity}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No amenities available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <ApartmentIcon fontSize="small" sx={{ mr: 1 }} />
                    Sell Details
                  </Typography>
                  {sellDetails && (
                    <>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Expected Price:</strong> {sellDetails.expectedPrice}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Available From:</strong> {sellDetails.availableFrom ? format(new Date(sellDetails.availableFrom), 'MMMM d, yyyy') : 'N/A'}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Furnishing Status:</strong> {sellDetails.furnishingStatus}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        <strong>Parking Details:</strong> {sellDetails.parkingDetails}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Rental Details */}
            {rentalDetails && (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      <ApartmentIcon fontSize="small" sx={{ mr: 1 }} />
                      Rental Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Expected Rent:</strong> {rentalDetails.expectedRent}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Deposit:</strong> {rentalDetails.monthlyRent}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Available From:</strong> {rentalDetails.availableFrom ? format(new Date(rentalDetails.availableFrom), 'MMMM d, yyyy') : 'N/A'}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Furnishing Status:</strong> {rentalDetails.furnishingStatus}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      <strong>Parking Details:</strong> {rentalDetails.parkingDetails}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Property Location */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                    Location
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>State:</strong> {location?.state}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>City:</strong> {location?.city}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Address:</strong> {location?.address}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Pincode:</strong> {location?.pincode}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertyDetailsDialog;
