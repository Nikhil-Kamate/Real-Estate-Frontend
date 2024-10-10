import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Button, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    CircularProgress, 
    Container, 
    Box,
    Grid 
} from '@mui/material';
import PropertyDetailsDialog from './PropertyDetailsDialog'; // Make sure the import path is correct

const OwnerListedProp = ({ userId, handleBack }) => {
    const [properties, setProperties] = useState([]);   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/keyvista/api/propertydisplay/user/${userId}`);
                console.log('API Response:', response.data);
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

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>View Your Posted Property</h2>
        <Container>
            <br />
            <Grid container spacing={3}>
                {properties.length > 0 ? (
                    properties.map(property => (
                        <Grid item xs={12} sm={6} md={4} key={property.propertyId}>
                            <Card 
                                sx={{ 
                                    mb: 2, 
                                    borderRadius: 2, 
                                    boxShadow: 3, 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'space-between', 
                                    height: '100%'  // Uniform card height
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`http://localhost:8080/keyvista/static/uploads/${property.propertyimagePath}`}
                                    alt="Property"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" sx={{ mb: 1 }}>{property.propertyType}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>BHK Type:</strong> {property.bhkType}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Built-Up Area:</strong> {property.builtUpArea} sq. ft.</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Description:</strong> {property.propertyDescription}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Status:</strong> {property.approvalStatus}</Typography>
                                    <Typography variant="body1" sx={{ mb: 1 }}><strong>Listed As:</strong> {property.listAs}</Typography>
                                    {property.listAs === 'broker' && (
                                        <Typography variant="body1" sx={{ mb: 2 }}><strong>Broker License:</strong> {property.brokerLicence}</Typography>
                                    )}
                                </CardContent>
                                {/* Align the View button at the bottom, centered */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={() => handleViewClick(property.propertyId)}
                                        sx={{ width: '80%' }} // Centered button, takes 80% width
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
            </Grid>

            {/* Property Details Dialog */}
            {selectedPropertyDetails && (
                <PropertyDetailsDialog
                    open={dialogOpen}
                    handleClose={handleCloseDialog}
                    propertyDetails={selectedPropertyDetails}
                />
            )}
        </Container>
        </div>
    );
};

export default OwnerListedProp;
