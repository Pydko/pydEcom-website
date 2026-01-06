import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Box, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, CircularProgress, Paper,
  FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip 
} from '@mui/material';
import { Add, Inventory, AttachMoney, Warning, Remove } from '@mui/icons-material';
import { apiService } from '../api/apiService';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);


  const [formData, setFormData] = useState({
    name: '', description: '', price: '', imageUrl: '', categoryId: '', stock: ''
  });

  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);


  const loadData = async () => {
    setLoading(true);
    try {
      const [productsData, categoriesData] = await Promise.all([
        apiService.getAllProducts(),
        apiService.getAllCategories()
      ]);

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error('Data not loaded:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock < 5).length;
  const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0).toFixed(2);


  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      imageUrl: product.imageUrl || '',
      categoryId: product.category ? product.category.id : '',
      stock: product.stock.toString()
    });
    setDialogOpen(true);
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiService.deleteProduct(token, id);
      loadData(); 
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  
  const handleStockUpdate = async (product, change) => {
    const newStock = product.stock + change;
    if (newStock < 0) return;

    try {
      const data = {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        categoryId: product.category?.id || product.categoryId,
        stock: newStock
      };

      await apiService.updateProduct(token, product.id, data);
      
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === product.id ? { ...p, stock: newStock } : p)
      );

    } catch (err) {
      alert('Stock error: ' + err.message);
      loadData();
    }
  };



  const handleSubmit = async () => {
    try {
      const data = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        categoryId: parseInt(formData.categoryId),
        stock: parseInt(formData.stock)
      };

      if (editingProduct) {
        await apiService.updateProduct(token, editingProduct.id, data);
      } else {
        await apiService.createProduct(token, data);
      }

      setDialogOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '', stock: '' });
      loadData();
    } catch (err) {
      alert('Operation failed: ' + err.message);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '', stock: '' });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.secondary' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd' }}>
            <Inventory fontSize="large" color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h4">{totalProducts}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Total Products</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#fff3e0' }}>
            <Warning fontSize="large" color="warning" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h4">{lowStockCount}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Low Stock Items</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: '#e8f5e9' }}>
            <AttachMoney fontSize="large" color="success" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h5">${totalValue}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Total Inventory Value</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* product controller */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Product Management</Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
        >
          Add New Product
        </Button>
      </Box>

      {/* product list */}
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            {/* product card */}
            <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isAdmin={true}
                />
                
                {/* stocks */}
                <Box sx={{ 
                    p: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    bgcolor: '#f5f5f5',
                    borderTop: '1px solid #e0e0e0',
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4
                }}>
                    <Typography variant="body2" sx={{ mr: 2, fontWeight: 'bold', color: 'text.secondary' }}>
                        Quick Stock:
                    </Typography>
                    
                    <Tooltip title="Decrease Stock">
                        <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleStockUpdate(product, -1)}
                            disabled={product.stock <= 0}
                        >
                            <Remove fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Box sx={{ 
                        mx: 1.5, 
                        minWidth: '30px', 
                        textAlign: 'center', 
                        fontWeight: 'bold',
                        bgcolor: 'white',
                        border: '1px solid #ddd',
                        borderRadius: 1,
                        py: 0.5
                    }}>
                        {product.stock}
                    </Box>

                    <Tooltip title="Increase Stock">
                        <IconButton 
                            size="small" 
                            color="success" 
                            onClick={() => handleStockUpdate(product, 1)}
                        >
                            <Add fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* edit btn */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price ($)"
            type="number"
            required
            inputProps={{ min: 0.01, step: 0.01 }}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Image URL"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />

          {/* category selector */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              label="Category"
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            >
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Categories Found</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            type="number"
            required
            inputProps={{ min: 0 }}
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.price || !formData.categoryId || !formData.stock}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};