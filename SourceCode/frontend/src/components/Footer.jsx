import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Phone, LocationOn, Email, LocalShipping, Verified } from '@mui/icons-material';

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto',
        borderTop: '4px solid #1976d2',
        width: '100%',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* INFO */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h5"
              color="primary"
              gutterBottom
              fontWeight="bold"
              sx={{ letterSpacing: 1 }}
            >
              pydEcom
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: '#ccc', mb: 2, lineHeight: 1.8 }}
            >
              Your trusted source for automotive spare parts.
              We offer both <strong>Original (OEM)</strong> and{' '}
              <strong>Genuine Used (Salvage)</strong> parts.
            </Typography>

            {/* CARGO */}
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                border: '1px dashed #555',
                borderRadius: 2,
                bgcolor: 'rgba(25, 118, 210, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <LocalShipping color="success" sx={{ fontSize: 18, mr: 1 }} />
                <Typography
                  variant="body2"
                  color="#4caf50"
                  fontWeight="bold"
                >
                  Free Shipping over 5000 TL!
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Verified color="primary" sx={{ fontSize: 18, mr: 1 }} />
                <Typography variant="body2" color="#90caf9">
                  Guaranteed Original Parts
                </Typography>
              </Box>
            </Box>

            {/* GITHUB LINK */}
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              GitHub:{' '}
              <Link
                href="https://github.com/Pydko"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                color="primary"
              >
                github.com/Pydko
              </Link>
            </Typography>
          </Grid>

          {/* LINKS */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              sx={{ color: '#fff' }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="#ccc" underline="hover">
                Home
              </Link>
              <Link href="#" color="#ccc" underline="hover">
                About Us
              </Link>
              <Link href="#" color="#ccc" underline="hover">
                Services
              </Link>
              <Link href="#" color="#ccc" underline="hover">
                Contact
              </Link>
              <Link href="#" color="#ccc" underline="hover">
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* CONTACT */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight="bold"
              sx={{ color: '#fff' }}
            >
              Contact Us
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <LocationOn
                color="primary"
                sx={{ mr: 1, mt: 0.5, fontSize: 22 }}
              />
              <Typography variant="body2" color="#ccc">
                Topkapı University, Altunizade Campus <br />
                Üsküdar / İstanbul / Turkey
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone color="primary" sx={{ mr: 1, fontSize: 22 }} />
              <Typography variant="body2" color="#ccc">
                +90 555 100 66 66
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email color="primary" sx={{ mr: 1, fontSize: 22 }} />
              <Typography variant="body2" color="#ccc">
                info@pydecom.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
