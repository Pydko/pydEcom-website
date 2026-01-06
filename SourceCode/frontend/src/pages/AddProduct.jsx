import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: 1, 
    stock: 10
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addProduct(product);
      alert("Product added successfully!");
      navigate('/');
    } catch (error) {
      alert("Error! You may not be logged in.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Add New Product</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Product Name" name="name" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Description" name="description" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Price" name="price" type="number" onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Image URL" name="imageUrl" onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Stock" name="stock" type="number" onChange={handleChange} required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Save</Button>
      </Box>
    </Container>
  );
};

export default AddProduct;