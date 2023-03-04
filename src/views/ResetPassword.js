import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { emailValidator } from '../helpers/emailValidator';
import { sendEmailWithPassword } from '../api/auth-api';

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: '', message: '' });

  const handleCloseToast = () => {
    setToast({ open: false, type: '', message: '' });
  };

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    setLoading(true);
    const response = await sendEmailWithPassword(email.value);
    if (response.error) {
      setToast({ open: true, type: 'error', message: response.error });
    } else {
      setToast({
        open: true,
        type: 'success',
        message: 'Email with password has been sent.',
      });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" component="h1" gutterBottom>
        Restore Password
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-mail address"
        name="email"
        value={email.value}
        onChange={(event) =>
          setEmail({ value: event.target.value, error: '' })
        }
        error={!!email.error}
        helperText={email.error}
        autoComplete="email"
        autoFocus
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={sendResetPasswordEmail}
        disabled={loading}
      >
        {loading ? 'Loading' : 'Send Instructions'}
      </Button>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={toast.message}
        severity={toast.type}
      />
    </Container>
  );
}
