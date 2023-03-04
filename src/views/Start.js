import React from 'react';
import {
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

export default function Start() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center">
        Bet Bro
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLoginClick}
      >
        Login
      </Button>
    </Container>
  );
}
