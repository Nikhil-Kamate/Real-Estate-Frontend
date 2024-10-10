import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CircularProgress,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Divider
} from '@mui/material';
import PropertyDetailsDialog from './PropertyDetailsDialog'; // Adjust the import path as necessary
import { Link } from 'react-router-dom';

const ApprovedPropertyCard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
    const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
    const [bhkFilter, setBhkFilter] = useState('All');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.userDetails?.userdetailsId;
    const isSubscribed = user?.userDetails?.isSubscribed;

    // State for filters
    const [bhkType, setBhkType] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/keyvista/api/propertydisplay/approved/exclude/${userId}`);
                if (Array.isArray(response.data)) {
                    setProperties(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching properties:', error);
                setError('Error fetching properties. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [userId]);

    const handleViewClick = async (propertyId) => {
        if (isSubscribed) {
            try {
                const response = await axios.get(`http://localhost:8080/keyvista/api/propertydisplay/property/details/${propertyId}`);
                setSelectedPropertyDetails(response.data);
                setDialogOpen(true);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        } else {
            setSubscribeDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedPropertyDetails(null);
    };

    const handleCloseSubscribeDialog = () => {
        setSubscribeDialogOpen(false);
    };

    const handleBhkChange = (event) => {
        setBhkFilter(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    // Filter properties based on selected filters
    const filteredProperties = properties.filter(property => {
        const matchesBhk = bhkFilter !== 'All' ? property.bhkType === bhkFilter : true;  // Use bhkFilter here
        const matchesCity = city ? property.location.city.toLowerCase().includes(city.toLowerCase()) : true;
        const matchesAddress = address ? property.location.address.toLowerCase().includes(address.toLowerCase()) : true;
    
        return matchesBhk && matchesCity && matchesAddress;
    });
    

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <Typography variant="h5" align="center" sx={{ mb: 4 }}>
                <h3> Search for Your Dream Property</h3>
            </Typography>

            {/* Filter Box */}
            <Box sx={{ mb: 4, padding: 3, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#f9f9f9', boxShadow: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} align="center">
                    Filters
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>BHK Type</InputLabel>
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
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Search By City"
                            value={city}
                            onChange={handleCityChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Search By Address"
                            value={address}
                            onChange={handleAddressChange}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Properties Grid */}
            <Grid container spacing={2}>
                {filteredProperties.length > 0 ? (
                    filteredProperties.map(({ property, rentalDetails, sellDetails, location }) => (
                        <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
                            <Card
                                sx={{
                                    mb: 2,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%'  // Ensures uniform card height
                                }}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`http://localhost:8080/keyvista/static/uploads/${property.propertyimagePath}`}
                                        alt="Property"
                                    />
                                    {/* Status Box */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: property.propertyStatus === 'Available' ? '#d4edda' : '#f8d7da',
                                            padding: '5px 10px',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        <Typography variant="body1" sx={{ color: property.propertyStatus === 'Available' ? '#155724' : '#721c24' }}>
                                            <strong>{property.propertyStatus}</strong>
                                        </Typography>
                                    </Box>
                                </Box>

                                <CardContent sx={{ padding: 2, flexGrow: 1 }}>
                                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>{property.propertyType}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>BHK Type:</strong> {property.bhkType}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Built-Up Area:</strong> {property.builtUpArea} sq. ft.</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Listed As:</strong> {property.listAs}</Typography>
                                    {property.listAs === 'broker' && (
                                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Broker License:</strong> {property.brokerLicence}</Typography>
                                    )}
                                    {sellDetails && (
                                        <Typography variant="body1" sx={{ mb: 1, color: 'green' }}><strong>Expected Price:</strong> ₹<span style={{ color: 'green' }}>{sellDetails.expectedPrice}</span></Typography>
                                    )}
                                    {rentalDetails && (
                                        <>
                                            <Typography variant="body1" sx={{ mb: 1, color: 'green' }}><strong>Expected Rent:</strong> ₹<span style={{ color: 'green' }}>{rentalDetails.expectedRent}</span></Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}><strong>Monthly Rent:</strong> ₹{rentalDetails.monthlyRent}</Typography>
                                        </>
                                    )}
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>City:</strong> {location.city}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Address:</strong> {location.address}</Typography>
                                </CardContent>

                                {/* View Button */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewClick(property.propertyId)}
                                        sx={{ width: '80%' }} // Centered button
                                    >
                                        View
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography>No properties available.</Typography>
                )}

                {/* Property Details Dialog */}
                {selectedPropertyDetails && (
                    <PropertyDetailsDialog
                        open={dialogOpen}
                        handleClose={handleCloseDialog}
                        propertyDetails={selectedPropertyDetails}
                    />
                )}

                {/* Subscribe Dialog */}
                <Dialog open={subscribeDialogOpen} onClose={handleCloseSubscribeDialog}>
                    <DialogTitle>Subscription Required</DialogTitle>
                    <DialogContent>
                        <Typography>
                            To get more details, please subscribe yourself.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/subscriptionpayment">
                            <Button variant="contained" color="error" onClick={handleCloseSubscribeDialog}>
                                Subscribe
                            </Button>
                        </Link>
                        <Button onClick={handleCloseSubscribeDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    );
};

export default ApprovedPropertyCard;
