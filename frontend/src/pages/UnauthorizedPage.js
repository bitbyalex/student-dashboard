import React from 'react';
import { Container, Typography } from '@mui/material';

const Unauthorized = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Unauthorized Access
            </Typography>
            <Typography variant="body1">
                You do not have permission to view this page.
            </Typography>
        </Container>
    );
};

export default Unauthorized;
