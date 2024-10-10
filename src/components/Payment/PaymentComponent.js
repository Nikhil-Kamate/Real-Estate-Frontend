import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image from '../../images/upi.png';
import Image1 from '../../images/payment.png';

const PaymentComponent = ({ userId, onPaymentSuccess }) => {
  const navigate = useNavigate();

  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [paymentDate, setPaymentDate] = useState(null);
  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const plans = [
    { label: '1 Year - ₹1000', value: '1-year', amount: 1000, expireInYears: 1 },
    { label: '6 Months - ₹500', value: '6-months', amount: 500, expireInYears: 0.5 },
    { label: '1 Month - ₹100', value: '1-month', amount: 100, expireInYears: 1 / 12 },
  ];

  const cardTypes = ['Visa', 'MasterCard', 'RuPay', 'AmEx'];

  const handlePlanSelect = (event) => {
    const selectedPlan = plans.find((plan) => plan.value === event.target.value);
    setSelectedPlan(selectedPlan.value);
    setPaymentAmount(selectedPlan.amount);

    const currentDate = new Date();
    const newExpirationDate = new Date(currentDate);

    if (selectedPlan.expireInYears >= 1) {
      newExpirationDate.setFullYear(currentDate.getFullYear() + selectedPlan.expireInYears);
    } else {
      const monthsToAdd = selectedPlan.expireInYears * 12;
      newExpirationDate.setMonth(currentDate.getMonth() + monthsToAdd);
    }

    setExpirationDate(newExpirationDate.toISOString().split('T')[0]);
  };

  const handleMakePayment = () => {
    setOpenDialog(true);
  };

  const handleConfirmPayment = () => {
    setOpenDialog(false);
    setLoading(true);

    // Axios API call to backend
    axios
      .post(`http://localhost:8080/keyvista/api/payment/process/${userId}`, {
        paymentAmount: paymentAmount,
        subscriptionExpireDate: expirationDate,
      })
      .then((response) => {
        setPaymentDate(new Date().toISOString().split('T')[0]); // Set payment date
        setOpenSuccessDialog(true); // Open success dialog
        onPaymentSuccess(true); // Notify parent of success
      })
      .catch((error) => {
        console.error('Payment failed:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancelPayment = () => {
    setOpenDialog(false);
  };

  const handleCloseSuccessDialog = () => {
    // Reset the form after successful payment
    setSelectedPlan('');
    setPaymentAmount(null);
    setExpirationDate(null);
    setCardType('');
    setCardNumber('');
    setCvv('');
    setCardExpiry('');

    setOpenSuccessDialog(false);
    navigate('/user-dashboard');
  };

  const isValidCardNumber = cardNumber.length === 16;
  const isValidCvv = cvv.length === 3;
  const isFormValid = selectedPlan && isValidCardNumber && isValidCvv && cardExpiry && cardType;

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 16) {
      setCardNumber(value); // Ensure max length of 16
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length <= 3) {
      setCvv(value); // Ensure max length of 3
    }
  };

  const today = new Date().toISOString().slice(0, 7); // Formats to "YYYY-MM"

  return (
    <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
      <Card
        style={{
          maxWidth: '800px',
          padding: '20px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <CardMedia
              component="img"
              alt="Payment"
              image={Image}
              style={{
                borderRadius: '10px',
                objectFit: 'cover',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
            <CardMedia
              component="img"
              alt="Payment"
              image={Image1}
              style={{
                borderRadius: '10px',
                objectFit: 'cover',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <CardContent>
              <Typography variant="h4" gutterBottom align="center">
                Subscription Payment
              </Typography>

              <TextField
                select
                label="Select Plan"
                value={selectedPlan}
                onChange={handlePlanSelect}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {plans.map((plan) => (
                  <MenuItem key={plan.value} value={plan.value}>
                    {plan.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Card Type"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              >
                {cardTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Card Number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="tel" // Set to telephone to avoid browsers' auto up/down arrows
                helperText="Enter 16-digit card number"
                error={!isValidCardNumber && cardNumber.length > 0}
              />

              <TextField
                label="CVV"
                value={cvv}
                onChange={handleCvvChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="tel" // Set to telephone to avoid browsers' auto up/down arrows
                helperText="Enter 3-digit CVV"
                error={!isValidCvv && cvv.length > 0}
              />

              <TextField
                label="Card Expiration Date"
                type="month"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
                helperText="Expiration Month and Year"
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleMakePayment}
                disabled={!isFormValid || loading}
                fullWidth
                style={{ marginTop: '20px' }}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Processing...' : 'Make Payment'}
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Dialog open={openDialog} onClose={handleCancelPayment}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to make the payment of ₹{paymentAmount} for the selected plan?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPayment} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmPayment} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
        <DialogTitle>Payment Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Congratulations! You are now subscribed.
            <br />
            <strong>Selected Plan:</strong> {selectedPlan}
            <br />
            <strong>Payment Amount:</strong> ₹{paymentAmount}
            <br />
            <strong>Payment Date:</strong> {paymentDate}
            <br />
            <strong>Subscription Expiry Date:</strong> {expirationDate}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PaymentComponent;
