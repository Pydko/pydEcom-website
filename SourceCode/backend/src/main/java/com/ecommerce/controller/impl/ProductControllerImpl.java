package com.ecommerce.controller.impl;

import com.ecommerce.controller.IProductController;
import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.ProductRequestDto;
import com.ecommerce.service.IProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductControllerImpl implements IProductController {

    @Autowired
    private IProductService productService;

    @Override
    @PostMapping("/save")
    public ProductDto saveProduct(@Valid @RequestBody ProductRequestDto productRequestDto) {
        return productService.saveProduct(productRequestDto);
    }

    @Override
    @GetMapping("/all")
    public List<ProductDto> getAllProducts() {
        return productService.getAllProducts();
    }

    @Override
    @GetMapping("/{id}")
    public ProductDto getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public void deleteProductById(@PathVariable("id") Long id) {
        productService.deleteProductById(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public ProductDto updateProduct(@PathVariable("id") Long id,
                                    @Valid @RequestBody ProductRequestDto productRequestDto) {
        return productService.updateProduct(id, productRequestDto);
    }

    @Override
    @GetMapping("/category/{categoryId}")
    public List<ProductDto> getProductsByCategory(@PathVariable("categoryId") Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    @Override
    @GetMapping("/search")
    public List<ProductDto> searchProducts(@RequestParam("keyword") String keyword) {
        return productService.searchProducts(keyword);
    }
}