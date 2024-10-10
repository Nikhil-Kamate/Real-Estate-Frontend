import React, { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import axios from "axios";

const BrokerForm = ({ open, handleClose }) => {
    const [brokerageRate, setBrokerageRate] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    // Get userDetailsId from localStorage
    const userDetailsId = JSON.parse(localStorage.getItem('user'))?.userDetails?.userdetailsId;

    const handleOpenConfirmDialog = (e) => {
        e.preventDefault(); // Prevent default form submission
        setOpenConfirmDialog(true); // Open the confirmation dialog
    };

    const handleCloseConfirmDialog = (confirmed) => {
        setOpenConfirmDialog(false);
        if (confirmed) {
            handleSubmit(); // Proceed with form submission if confirmed
        }
    };

    const handleSubmit = async () => {
        setError("");
        setLoading(true);

        const brokerData = {
            brokerageRate: parseFloat(brokerageRate),
            userdetailsId: userDetailsId, // Use userDetailsId from localStorage
        };

        try {
            const response = await axios.post('http://localhost:8080/keyvista/api/brokers/save', brokerData);
            console.log('Broker saved:', response.data); // Log the response
            setBrokerageRate(""); // Reset the brokerage rate input
            handleClose(); // Close the dialog after successful submission
        } catch (err) {
            setError(err.response?.data?.error || "Failed to save broker.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box padding={4} maxWidth="400px" margin="auto">
                <Typography variant="h4" gutterBottom align="center">
                    Enter Your Brokerage Rate
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: "16px" }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleOpenConfirmDialog}>
                    <TextField
                        id="brokerageRate"
                        label="Brokerage Rate"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={brokerageRate}
                        onChange={(e) => setBrokerageRate(e.target.value)}
                        required
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Broker"}
                    </Button>
                </form>

                {/* Confirmation Dialog */}
                <Dialog open={openConfirmDialog} onClose={() => handleCloseConfirmDialog(false)}>
                    <DialogTitle>Confirm Submission</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to submit the following details?
                        </Typography>
                        <Typography><strong>Brokerage Rate:</strong> {brokerageRate}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseConfirmDialog(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleCloseConfirmDialog(true)} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Dialog>
    );
};

export default BrokerForm;
