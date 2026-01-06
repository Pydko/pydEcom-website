package com.ecommerce.service;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.ProductRequestDto;

import java.util.List;

public interface IProductService {

    ProductDto saveProduct(ProductRequestDto productRequestDto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    void deleteProductById(Long id);
    ProductDto updateProduct(Long id, ProductRequestDto productRequestDto);
    List<ProductDto> getProductsByCategory(Long categoryId);
    List<ProductDto> searchProducts(String keyword);
}