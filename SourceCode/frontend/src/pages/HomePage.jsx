import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Box, Typography, CircularProgress, Paper, IconButton, Badge } from '@mui/material';
import { Search, ShoppingCart } from '@mui/icons-material';
import { apiService } from '../api/apiService';
import { ProductCard } from '../components/ProductCard';
import { useFilter } from '../context/FilterContext';
import { useCart } from '../context/CartContext'; // <--- YENİ

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchTerm, setSearchTerm, selectedCategory } = useFilter();
  const { setIsCartOpen, cartItems } = useCart(); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await apiService.getAllProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error('Data error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  //FILTER A CATEGORIES AND PRODUCTS USING WITH DEPENDENCY ARRAY
  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category && p.category.id === selectedCategory);
    }
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>

      {/* TOP */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        mb: 5,
        mt: 2,
        gap: 2 
      }}>

        {/* SEARCH BAR */}
        <Paper
          elevation={3}
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            borderRadius: '50px',
            border: '1px solid #e0e0e0',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }
          }}
        >
          <Box sx={{ p: 2, color: 'text.secondary' }}>
            <Search />
          </Box>
          <TextField
            fullWidth
            placeholder="Search for brake pads, oil, filters..."
            variant="standard"
            InputProps={{ disableUnderline: true }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
          />
        </Paper>

        {/* CART BUTTON */}
        <IconButton
          color="primary"
          onClick={() => setIsCartOpen(true)} 
          sx={{
            bgcolor: 'white',
            boxShadow: 3,
            width: 56,
            height: 56,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCart fontSize="medium" />
          </Badge>
        </IconButton>

      </Box>

      {/* PRODUCT INFO */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="text.secondary">
          {selectedCategory === 'All' ? 'All Products' : 'Filtered Products'}
          <span style={{ fontSize: '0.9rem', marginLeft: '10px', color: '#999' }}>
            ({filteredProducts.length} items found)
          </span>
        </Typography>
      </Box>

      {/* PRODUCT LIST */}
      <Grid container spacing={2} justifyContent="center">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={product.id} sx={{ display: 'flex' }}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 5, color: '#999' }}>
              <Typography variant="h6">No products found.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};