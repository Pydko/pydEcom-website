import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton, Badge } from '@mui/material';
import { ShoppingCart, DirectionsCar, Logout, Login, PersonAdd, AdminPanelSettings, Home } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#1976d2', boxShadow: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* LOGO */}
          <DirectionsCar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 32 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 4, 
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.5rem'
            }}
          >
            pydEcom
          </Typography>

          {/* to the left */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            
            {/* hompeage button */}
            <Button 
              color="inherit" 
              component={Link} 
              to="/" 
              startIcon={<Home />}
              sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }}
            >
              Home
            </Button>

            {/* admin btn */}
            {user?.role === 'ADMIN' && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin" 
                startIcon={<AdminPanelSettings />}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } 
                }}
              >
                Admin Panel
              </Button>
            )}

            {/* auth buton */}
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2, borderLeft: '1px solid rgba(255,255,255,0.3)', pl: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Hi, {user.sub || user.username}
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<Logout />} sx={{ textTransform: 'none' }}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, ml: 2, borderLeft: '1px solid rgba(255,255,255,0.3)', pl: 2 }}>
                <Button color="inherit" component={Link} to="/login" startIcon={<Login />} sx={{ textTransform: 'none' }}>
                  Login
                </Button>
                <Button 
                    variant="outlined" 
                    color="inherit" 
                    component={Link} 
                    to="/register" 
                    startIcon={<PersonAdd />}
                    sx={{ textTransform: 'none', borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>

          {/* cartdrawer */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton color="inherit" sx={{ p: 0 }}>
              <Badge badgeContent={0} color="error">
                <ShoppingCart sx={{ fontSize: 28 }} />
              </Badge>
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};