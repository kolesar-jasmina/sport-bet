import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../api/auth-api';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '16px',
    backgroundColor: '#fff',
    color: '#333',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  googleIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SocialsLogin = ({ setError, onLoginSuccess }) => {
  const classes = useStyles();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onLoginSuccess(result.user);
      console.log(result.user);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Button fullWidth variant="contained" className={classes.button} onClick={handleGoogleLogin}>
      <FaGoogle className={classes.googleIcon} />
      Sign in with Google
    </Button>
  );
};

export default SocialsLogin;
