import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, CardMedia, CardContent, Typography, Chip, Box, CircularProgress, Button, Grid } from '@mui/material';
import { Category, AddShoppingCart, ArrowBack } from '@mui/icons-material';
import { apiService } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error('Failed to load product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
  if (!product) return <Typography variant="h5" align="center" mt={10}>Product not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back to Store</Button>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 2 }}>

        {/* SOL: Resim */}
        <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#f9f9f9', p: 2 }}>
          <CardMedia
            component="img"
            image={product.imageUrl || 'https://via.placeholder.com/600x400'}
            alt={product.name}
            sx={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
          />
        </Box>

        {/* SAĞ: Bilgiler */}
        <CardContent sx={{ width: { xs: '100%', md: '50%' }, pl: { md: 4 } }}>
          {product.category && (
            <Chip
              icon={<Category />}
              label={product.category.name}
              color="primary"
              variant="outlined"
              sx={{ mb: 2 }}
            />
          )}

          <Typography variant="h4" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>

          
          <Typography variant="h3" color="primary.main" fontWeight="bold" sx={{ mb: 2 }}>
            ₺{product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: '#555', mb: 4 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Chip
              label={product.stock > 0 ? `${product.stock} Available in Stock` : 'Out of Stock'}
              color={product.stock > 0 ? 'success' : 'error'}
            />
            {product.stock > 0 && product.stock < 5000 && (
              <Typography variant="caption" color="success.main" fontWeight="bold">
                Qualifies for FREE Shipping over 5000₺!
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddShoppingCart />}
            fullWidth
            disabled={product.stock === 0}
            onClick={() => alert('Added to cart!')}
            sx={{ py: 1.5, fontSize: '1.1rem' }}
          >
            Add to Cart
          </Button>

        </CardContent>
      </Card>
    </Container>
  );
};