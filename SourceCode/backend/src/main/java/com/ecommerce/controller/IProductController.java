package com.ecommerce.controller;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.ProductRequestDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface IProductController {

    @PostMapping("/save")
    ProductDto saveProduct(@RequestBody ProductRequestDto productRequestDto);

    @GetMapping("/all")
    List<ProductDto> getAllProducts();

    @GetMapping("/{id}")
    ProductDto getProductById(@PathVariable("id") Long id);

    @DeleteMapping("/delete/{id}")
    void deleteProductById(@PathVariable("id") Long id);

    @PutMapping("/update/{id}")
    ProductDto updateProduct(@PathVariable("id") Long id,
                             @RequestBody ProductRequestDto productRequestDto);

    @GetMapping("/category/{categoryId}")
    List<ProductDto> getProductsByCategory(@PathVariable("categoryId") Long categoryId);

    @GetMapping("/search")
    List<ProductDto> searchProducts(@RequestParam("keyword") String keyword);
}