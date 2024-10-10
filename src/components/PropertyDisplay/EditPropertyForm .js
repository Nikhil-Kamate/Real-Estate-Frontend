import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    CircularProgress,
} from '@mui/material';

const EditPropertyForm = ({ open, handleClose, propertyId, onPropertyUpdated }) => {
    const [formData, setFormData] = useState({
        listAs: '',
        propertyType: '',
        bhkType: '',
        builtUpArea: '',
        propertyStatus: '',
        approvalStatus: '',
        amenities: '',
        propertyDescription: '',
        expectedRent: '',
        monthlyRent: '',
        availableFrom: '',
        furnishingStatus: '',
        parkingDetails: '',
        state: '',
        city: '',
        address: '',
        pincode: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (propertyId) {
            const fetchProperty = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/keyvista/api/propertydisplay/property/details/${propertyId}`);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Error fetching property details:', error);
                }
            };
            fetchProperty();
        }
    }, [propertyId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put('http://localhost:8080/keyvista/api/property/update/rent', { ...formData, propertyId });
            onPropertyUpdated(); // Notify parent to refresh properties
            handleClose();
        } catch (error) {
            console.error('Error updating property:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="List As"
                        name="listAs"
                        value={formData.listAs}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Property Type"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="BHK Type"
                        name="bhkType"
                        value={formData.bhkType}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Built-Up Area"
                        name="builtUpArea"
                        value={formData.builtUpArea}
                        onChange={handleChange}
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        fullWidth
                        label="Property Status"
                        name="propertyStatus"
                        value={formData.propertyStatus}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Approval Status"
                        name="approvalStatus"
                        value={formData.approvalStatus}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="propertyDescription"
                        value={formData.propertyDescription}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    {/* Add more fields as needed */}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPropertyForm;
