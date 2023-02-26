import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthLoadingScreen() {
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        history.replace('/home');
      } else {
        history.replace('/start');
      }
    });

    return () => unsubscribe();
  }, [history]);

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color="primary" />
    </Container>
  );
}
