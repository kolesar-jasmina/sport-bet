import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthLoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate.replace('/home');
      } else {
        navigate.replace('/start');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" />
    </Container>
  );
}
