import React, { useState } from 'react';
import { Container, Typography, Button, TextField } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { emailValidator } from '../helpers/emailValidator';
import { loginUser } from '../api/auth-api';
import SocialsLogin from '../components/SocialsLogin';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ value: '', type: '' });

  const handleSuccess = () => {
    navigate('/home');
  };

  const handleLogin = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    if (!password.value) {
      setPassword({ ...password, error: 'Password cannot be empty' });
      return;
    }

    setLoading(true);
    const response = await loginUser(email.value, password.value);
    if (response.error) {
      setToast({ type: 'error', message: response.error });
    } else {
      setToast({ type: 'success', message: 'Login successful!' });
      handleSuccess();
    }
    setLoading(false);
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      <TextField
        label="E-mail address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email.value}
        onChange={(event) => setEmail({ value: event.target.value, error: '' })}
        error={!!email.error}
        helperText={email.error}
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password.value}
        onChange={(event) => setPassword({ value: event.target.value, error: '' })}
        error={!!password.error}
        helperText={password.error}
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </Button>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Forgot your password? <Link to="/reset-password">Reset password</Link>
      </Typography>
      <SocialsLogin setError={setToast} onLoginSuccess={handleSuccess} />
    </Container>
  );
};

export default LoginScreen;
