import React from 'react';
import {
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function StartScreen() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
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
