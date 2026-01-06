import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

export const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

//LISTEN THE SCROLL 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    //CLEANUP FUNCTION USED FOR MEMORY
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

//WHEN THE CLICK BUTTON GO TOP
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Zoom in={showButton}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': { bgcolor: '#1565c0' }
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Zoom>
  );
};