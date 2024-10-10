import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';

const SellProperty = () => {
    const initialPropertyState = {
        propertyType: '',
        bhkType: '',
        builtUpArea: '',
        listAs: 'owner',
        propertyDescription: '',
        brokerLicence: '',
        amenities: [],
        owner: localStorage.getItem('ownerId'),
        location: {
            state: '',
            city: '',
            address: '',
            pincode: '',
        },
        sellDetails: {
            expectedPrice: '',
            availableFrom: '',
            furnishingStatus: '',
            parkingDetails: '',
        },
        type: 'Sell',
    };

    const [currentStep, setCurrentStep] = useState(1);
    const [property, setProperty] = useState(initialPropertyState);
    const [imageFile, setImageFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
	const [brokerLicense, setBrokerLicense] = useState('');
    const [builtUpAreaError, setBuiltUpAreaError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [pincodeError, setPincodeError] = useState('');
    const [expectedPriceError, setExpectedPriceError] = useState('');
    const [isNextEnabled, setIsNextEnabled] = useState(false);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
	
	const ownerId = localStorage.getItem('ownerId');

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/keyvista/api/locations/states');
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
            }
        };
        fetchStates();
    }, []);
	
	 // Fetch Broker License if the user is a broker and ownerId is available
    useEffect(() => {
        if (property.listAs === 'broker' && ownerId) {
            const fetchBrokerLicense = async () => {
                try {
                    console.log("Fetching broker license for ownerId:", ownerId); // Debugging purpose
                    const response = await axios.get(`http://localhost:8080/keyvista/api/brokers/license/${ownerId}`);
                    setBrokerLicense(response.data); // Expecting a single license as a string
                } catch (error) {
                    console.error("Error fetching broker license:", error);
                    setBrokerLicense(''); // Fallback in case of an error
                }
            };
            fetchBrokerLicense();
        }
    }, [property.listAs, ownerId]);

    const fetchCitiesByState = async (stateName) => {
        try {
            const response = await axios.get(`http://localhost:8080/keyvista/api/locations/cities/${stateName}`);
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Step 1: Validate Built-Up Area
        if (name === 'builtUpArea') {
            const areaValue = parseInt(value, 10);
            if (areaValue <= 0 || isNaN(areaValue)) {
                setBuiltUpAreaError('Built-up area must be a positive number.');
            } else {
                setBuiltUpAreaError('');
            }
        }

        // Step 1: Validate Description
        if (name === 'propertyDescription') {
            if (value.length > 50) {
                setDescriptionError('Description cannot exceed 50 characters.');
            } else {
                setDescriptionError('');
            }
        }

        // Step 2: Validate Address (max 50 characters)
        if (name === 'location.address') {
            if (value.length > 50) {
                setAddressError('Address cannot exceed 50 characters.');
            } else {
                setAddressError('');
            }
        }

        // Step 2: Validate Pincode (6 digits)
        if (name === 'location.pincode') {
            const pincodeValue = value;
            if (!/^\d{5}$/.test(pincodeValue)) {
                setPincodeError('Pincode must be exactly 6 digits.');
            } else {
                setPincodeError('');
            }
        }

        // Step 3: Validate Expected Price
        if (name === 'sellDetails.expectedPrice') {
            const priceValue = parseInt(value, 10);
            if (priceValue <= 0 || isNaN(priceValue)) {
                setExpectedPriceError('Expected price must be a positive number.');
            } else {
                setExpectedPriceError('');
            }
        }

        // Handle nested changes for sellDetails or location
        if (name.startsWith('sellDetails.') || name.startsWith('location.')) {
            const [key, subKey] = name.split('.');
            setProperty((prev) => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    [subKey]: value,
                },
            }));
        } else {
            setProperty((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (name === 'listAs' && value === 'broker') {
            setBrokerLicense(''); // Reset brokerLicense when switching to 'broker'
        }

        validateButtons();
    };

    const validateFile = (file) => {
        const allowedExtensions = ['image/png', 'image/jpeg'];
        const maxSize = 100 * 1024; // 100KB

        if (!allowedExtensions.includes(file.type)) {
            setFileError('Only PNG and JPG files are allowed.');
            return false;
        }

        if (file.size > maxSize) {
            setFileError('File size must not exceed 100KB.');
            return false;
        }

        setFileError('');
        return true;
    };

    const validateButtons = () => {
        // Validate Step 1 Fields
        if (currentStep === 1) {
            // Validate if the property is listed by 'Owner' or 'Broker'
            const isStep1Valid = property.propertyType !== '' &&
                                 (property.propertyType === 'Land' || property.bhkType !== '') && // Skip BHK for 'Land'
                                 property.builtUpArea > 0 &&
                                 property.propertyDescription.length > 0 &&
                                 builtUpAreaError === '' && 
                                 descriptionError === '' &&
                                 (property.listAs !== 'broker' || (property.listAs === 'broker' && property.brokerLicence !== ''));
        
            // Enable 'Next' button only if all conditions are met
            setIsNextEnabled(isStep1Valid);
        }
        

        // Validate Step 2 Fields
        if (currentStep === 2) {
            const isStep2Valid = property.location.state !== '' &&
                                 property.location.city !== '' &&
                                 property.location.address.length <= 50 &&
                                 /^\d{5}$/.test(property.location.pincode) &&
                                 addressError === '' && pincodeError === '';
            setIsNextEnabled(isStep2Valid);
        }

        // Validate Step 3 Fields
        if (currentStep === 3) {
            const isStep3Valid = property.sellDetails.expectedPrice !== '' &&
                                 property.sellDetails.availableFrom !== '' &&
                                 property.sellDetails.furnishingStatus !== '' &&
                                 property.sellDetails.parkingDetails !== '' &&
                                 imageFile !== null &&
                                 expectedPriceError === '' &&
                                 fileError === '';
            setIsSubmitEnabled(isStep3Valid);
        }
    };

    const handleAmenityChange = (e) => {
        const amenity = e.target.value;
        setProperty((prev) => {
            const amenities = prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity];

            return {
                ...prev,
                amenities,
            };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && validateFile(file)) {
            setImageFile(file);
        } else {
            setImageFile(null);
        }

        validateButtons();
    };

    const handleNext = () => {
        if (!isNextEnabled) return; // Prevent moving to next step if validation fails
        setCurrentStep((prev) => prev + 1);
        setIsNextEnabled(false); // Reset next button for the next step
    };

    const handleBack = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('imageFile', imageFile);

        Object.keys(property).forEach((key) => {
            if (key === 'sellDetails') {
                Object.keys(property.sellDetails).forEach((sellKey) => {
                    formData.append(`sellDetails.${sellKey}`, property.sellDetails[sellKey]);
                });
            } else if (key === 'location') {
                Object.keys(property.location).forEach((locationKey) => {
                    formData.append(`location.${locationKey}`, property.location[locationKey]);
                });
            } 
            else {
                formData.append(`property.${key}`, property[key]);
            }
        });

        try {
            await axios.post('http://localhost:8080/keyvista/api/property/sell', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowModal(true);
        } catch (error) {
            console.error('Error listing property:', error);
            alert('Failed to list property.');
        }
    };

    const resetForm = () => {
        setProperty(initialPropertyState);
        setImageFile(null);
        setCurrentStep(1);
        setCities([]);
        setIsNextEnabled(false);
        setIsSubmitEnabled(false);
    };

    const handleModalClose = () => {
        setShowModal(false);
        resetForm();
    };

    const totalSteps = 3;
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="container mt-5" style={{ padding: '0 200px' }}>
            <h2 style={{ textAlign: 'center' }}>List Property for Sale</h2>
            <br />
            <LinearProgress variant="determinate" value={(currentStep / totalSteps) * 100} className="mb-4" />
            <br />
            <br></br>
            <Stepper activeStep={currentStep - 1} alternativeLabel className="mb-4">
                <Step>
                    <StepLabel>Property Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Location Details</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Sale Details</StepLabel>
                </Step>
            </Stepper>

            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <div>
                        <h3>Property Details</h3>
                        <TextField
                            label="Listing Type"
                            name="type"
                            value={property.type}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Property Type</InputLabel>
                            <Select
                                name="propertyType"
                                value={property.propertyType}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="">Select Property Type</MenuItem>
                                <MenuItem value="Gated Community">Gated Community</MenuItem>
                                <MenuItem value="Independent House">Independent House</MenuItem>
                                <MenuItem value="Land">Land</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>BHK Type</InputLabel>
                            <Select
                                name="bhkType"
                                value={property.bhkType}
                                onChange={handleChange}
                                disabled={property.propertyType === 'Land'}
                                required={property.propertyType !== 'Land'}
                            >
                                <MenuItem value="">Select BHK Type</MenuItem>
                                <MenuItem value="1RK">1RK</MenuItem>
                                <MenuItem value="1BHK">1BHK</MenuItem>
                                <MenuItem value="2BHK">2BHK</MenuItem>
                                <MenuItem value="3BHK">3BHK</MenuItem>
                                <MenuItem value="4BHK">4BHK</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Built-Up Area (sq. ft.)"
                            type="number"
                            name="builtUpArea"
                            value={property.builtUpArea}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!builtUpAreaError}
                            helperText={builtUpAreaError}
                            required
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>List As</InputLabel>
                            <Select name="listAs" value={property.listAs} onChange={handleChange}>
                                <MenuItem value="owner">Owner</MenuItem>
                                <MenuItem value="broker">Broker</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Add Broker Licence Dropdown if 'listAs' is 'broker' */}
                        {property.listAs === 'broker' && brokerLicense && (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Broker Licence</InputLabel>
                                <Select
                                    name="brokerLicence"
                                    value={property.brokerLicence}
                                    onChange={(e) => {
                                        handleChange(e);
                                        validateButtons();
                                    }}
                                    required
                                >
                                    <MenuItem value={brokerLicense}>{brokerLicense}</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                        <TextField
                            label="Description"
                            name="propertyDescription"
                            value={property.propertyDescription}
                            onChange={handleChange}
                            fullWidth
                            margin="normal" 
                            multiline
                            required
                            error={!!descriptionError}
                            helperText={descriptionError}
                        />
                        <h4>Amenities</h4>
                        <FormControl fullWidth margin="normal">
                            <Grid container spacing={2}>
                                {['Parking', 'Gym', 'Swimming Pool', 'Garden'].map((amenity, index) => (
                                    <Grid item xs={6} key={index}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    value={amenity}
                                                    checked={property.amenities.includes(amenity)}
                                                    onChange={handleAmenityChange}
                                                    disabled={property.propertyType === 'Land'}
                                                />
                                            }
                                            label={amenity}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </FormControl>

                        <Button variant="contained" color="primary" onClick={handleNext}  disabled={!isNextEnabled}>
                            Next
                        </Button>
                    </div>
                )}

                {currentStep === 2 && (
                    <div>
                        <h3>Location Details</h3>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>State</InputLabel>
                            <Select
                                name="location.state"
                                value={property.location.state}
                                onChange={(e) => {
                                    handleChange(e);
                                    fetchCitiesByState(e.target.value);
                                }}
                                required
                            >
                                <MenuItem value="">Select State</MenuItem>
                                {states.map((state) => (
                                    <MenuItem key={state.id} value={state.name}>
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>City</InputLabel>
                            <Select
                                name="location.city"
                                value={property.location.city}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                required
                            >
                                <MenuItem value="">Select City</MenuItem>
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.name}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Address"
                            name="location.address"
                            value={property.location.address}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!addressError}
                            helperText={addressError}
                            required
                        />
                        <TextField
                            label="Pincode"
                            name="location.pincode"
                            value={property.location.pincode}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!pincodeError}
                            helperText={pincodeError}
                            required
                        />
                        <Button variant="contained" color="secondary" onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleNext} disabled={!isNextEnabled}>
                            Next
                        </Button>
                    </div>
                )}

                {currentStep === 3 && (
                    <div>
                        <h3>Sale Details</h3>
                        <TextField
                            label="Expected Price"
                            type="number"
                            name="sellDetails.expectedPrice"
                            value={property.sellDetails.expectedPrice}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            error={!!expectedPriceError}
                            helperText={expectedPriceError}
                            required
                        />
                        <TextField
                            label="Available From"
                            type="date"
                            name="sellDetails.availableFrom"
                            value={property.sellDetails.availableFrom}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: today }}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Furnishing Status</InputLabel>
                            <Select
                                name="sellDetails.furnishingStatus"
                                value={property.sellDetails.furnishingStatus}
                                onChange={handleChange}
                                disabled={property.propertyType === 'Land'}
                                required
                            >
                                <MenuItem value="">Select Furnishing Status</MenuItem>
                                <MenuItem value="Furnished">Furnished</MenuItem>
                                <MenuItem value="Semi-Furnished">Semi-Furnished</MenuItem>
                                <MenuItem value="Unfurnished">Unfurnished</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Parking Details</InputLabel>
                            <Select
                                name="sellDetails.parkingDetails"
                                value={property.sellDetails.parkingDetails}
                                onChange={handleChange}
                                disabled={property.propertyType === 'Land'}
                                required
                            >
                                <MenuItem value="">Select Parking Details</MenuItem>
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Not Available">Not Available</MenuItem>
                            </Select>
                        </FormControl>
                        
                        <TextField
                            label="Upload Image"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg"
                            fullWidth
                            margin="normal"
                            error={!!fileError}
                            helperText={fileError}
                            required
                        />

                        <Button variant="contained" color="secondary" onClick={handleBack}>
                            Back
                        </Button>
                        <Button type="submit" variant="contained" color="primary" >
                            Submit
                        </Button>
                    </div>
                )}
            </form>

            <Dialog open={showModal} onClose={handleModalClose}>
                <DialogTitle>Property Listed Successfully</DialogTitle>
                <DialogContent>
                    <p>Your property has been listed for sale successfully.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SellProperty;
