import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { emailValidator } from '../helpers/emailValidator';
import { sendEmailWithPassword } from '../api/auth-api';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: '', type: '' });

  const handleSendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    setLoading(true);
    const response = await sendEmailWithPassword(email.value);
    if (response.error) {
      setToast({ type: 'error', message: response.error });
    } else {
      setToast({
        type: 'success',
        message: 'Email with password has been sent.',
      });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Restore Password
      </Typography>
      <TextField
        label="E-mail address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email.value}
        onChange={(event) =>
          setEmail({ value: event.target.value, error: '' })
        }
        error={!!email.error}
        helperText={email.error}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSendResetPasswordEmail}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Instructions'}
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Remember your password? <Link to="/login">Login</Link>
      </Typography>
    </Container>
  );
}
