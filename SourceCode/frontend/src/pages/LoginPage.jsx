import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();


  // SENDING FORM
  const handleSubmit = async (e) => {
    e.preventDefault();//USES FOR PAGE REFRESH
    setError('');
    setLoading(true);

    try {
      const userData = await login(username, password);

      console.log("Incoming User Data:", userData);


      if (userData && userData.role === 'ADMIN') {
        console.log("Redirecting to the admin panel...");
        navigate('/admin');
      } else {
        console.log("Redirecting homepage...");
        navigate('/');
      }

    } catch (err) {
      console.error(err);
      setError('Login failed. Username or password is incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Login sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>Login</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField margin="normal" required fullWidth label="Username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField margin="normal" required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Button fullWidth onClick={() => navigate('/register')}>Don't have an account? Sign up</Button>
        </Box>
      </Box>
    </Container>
  );
};