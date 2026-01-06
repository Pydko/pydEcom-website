import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, CardMedia, CardActions, Typography, Button, Box, Chip
} from '@mui/material';
import { Edit, Delete, AddShoppingCart } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


//GET THE DATA WITH USING PROPS
export const ProductCard = ({ product, onEdit, onDelete, isAdmin }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart(); 
  const userIsAdmin = isAdmin !== undefined ? isAdmin : user?.role === 'ADMIN';

  const handleDetailClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        border: '1px solid #eee',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } 
      }}
    >
      <Box onClick={handleDetailClick} sx={{ height: '150px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', p: 1, position: 'relative', cursor: 'pointer' }}>
        <CardMedia
          component="img"
          image={product.imageUrl}
          alt={product.name}
          sx={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }}
        />
        {product.stock === 0 && (
          <Chip label="Out" color="error" size="small" sx={{ position: 'absolute', top: 5, right: 5, fontSize: '0.6rem', height: 20 }} />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 1.5, pb: 0 }}>
        <Typography variant="caption" color="text.secondary" sx={{textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 'bold'}}>
           {product.category ? product.category.name : 'General'}
        </Typography>
        <Typography variant="subtitle1" title={product.name} onClick={handleDetailClick} sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 0.5, height: '2.4em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', fontSize: '0.95rem', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
          {product.name}
        </Typography>
        <Typography variant="h6" color="primary.main" fontWeight="bold" sx={{ fontSize: '1.1rem', mt: 1 }}>
          ₺{product.price.toFixed(2)}
        </Typography>
        <Typography variant="caption" display="block" color={product.stock > 0 ? "success.main" : "error.main"} sx={{ mb: 1 }}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </Typography>
      </CardContent>
      
      
      {/* USES THE SAMEPAGE W USER OR ADMIN */}
      <CardActions sx={{ p: 1.5, pt: 0 }}>
        {userIsAdmin ? (
          <Box sx={{ width: '100%', display: 'flex', gap: 0.5 }}>
             <Button variant="outlined" size="small" fullWidth onClick={() => onEdit(product)} sx={{ fontSize: '0.7rem' }}>Edit</Button>
             <Button variant="outlined" color="error" size="small" fullWidth onClick={() => onDelete(product.id)} sx={{ fontSize: '0.7rem' }}>Del</Button>
          </Box>
        ) : (
          <Button 
            variant="contained" 
            fullWidth
            size="small"
            startIcon={<AddShoppingCart sx={{ fontSize: 16 }} />}
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
            sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}
          >
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};