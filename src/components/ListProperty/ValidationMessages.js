// ValidationMessages.js
import React from 'react';
import { Alert } from '@mui/material';

const ValidationMessages = ({ messages }) => {
    return (
        <>
            {messages.map((msg, index) => (
                <Alert key={index} severity="error" style={{ marginBottom: '8px' }}>
                    {msg}
                </Alert>
            ))}
        </>
    );
};

export default ValidationMessages;
