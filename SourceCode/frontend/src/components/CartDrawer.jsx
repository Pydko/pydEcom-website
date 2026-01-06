import React from 'react';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider } from '@mui/material';
import { Close, Add, Remove, Delete, ShoppingCartCheckout } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Drawer
      anchor="right"
      open={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, p: 2 }
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight="bold">My Cart ({cartItems.length})</Typography>
        <IconButton onClick={() => setIsCartOpen(false)}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      {/* PRODUCT LIST */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', my: 2 }}>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 5, opacity: 0.6 }}>
            <Typography variant="h6">Your cart is empty.</Typography>
          </Box>
        ) : (

          // LISTING THE CARTED PRODUCTS WITH USING MAP

          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} alignItems="flex-start" 
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                    <Delete />
                  </IconButton>
                }
                sx={{ borderBottom: '1px solid #f0f0f0', py: 2 }}
              >
                <ListItemAvatar>
                  <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                </ListItemAvatar>
                
                <ListItemText
                  primary={<Typography variant="subtitle1" fontWeight="bold">{item.name}</Typography>}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                       <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}><Remove fontSize="small" /></IconButton>
                          <Typography variant="body2" sx={{ mx: 1 }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}><Add fontSize="small" /></IconButton>
                       </Box>
                       <Typography variant="body1" color="primary" fontWeight="bold" sx={{ ml: 'auto' }}>
                         ₺{(item.price * item.quantity).toFixed(2)}
                       </Typography>
                    </Box>
                  }
                />

                {/* sx material ui inline css */}

              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* CALCULATER */}
      {cartItems.length > 0 && (
        <Box sx={{ mt: 'auto', pt: 2, borderTop: '2px dashed #eee' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">₺{cartTotal.toFixed(2)}</Typography>
          </Box>
          <Button 
            variant="contained" 
            fullWidth 
            size="large" 
            startIcon={<ShoppingCartCheckout />}
            sx={{ py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
            onClick={() => alert('Checkout is ready!')}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Drawer>
  );
};