package com.ecommerce.service.impl;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.dto.ProductRequestDto;
import com.ecommerce.entities.Category;
import com.ecommerce.entities.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.service.IProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {

    // Bağımlılık enjeksiyonu sadeleştirildi
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ProductDto saveProduct(ProductRequestDto productRequestDto) {
        Product product = new Product();

        // Kategori kontrolü
        Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // DTO'dan Entity'ye kopyalama
        BeanUtils.copyProperties(productRequestDto, product);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);

        // Hata 1: Dönüşüm mantığı bu metot içinde tekrar tekrar yazılıyor
        ProductDto response = new ProductDto();
        BeanUtils.copyProperties(savedProduct, response);
        if (savedProduct.getCategory() != null) {
            ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
            BeanUtils.copyProperties(savedProduct.getCategory(), categoryDto);
            response.setCategory(categoryDto);
        }

        return response;
    }

    @Override
    public List<ProductDto> getAllProducts() {
        List<Product> productList = productRepository.findAll();
        List<ProductDto> responseList = new ArrayList<>();

        for(Product product : productList) {
            // Hata 1: Dönüşüm mantığı tekrar ediyor
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product, productDto);

            if (product.getCategory() != null) {
                ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
                BeanUtils.copyProperties(product.getCategory(), categoryDto);
                productDto.setCategory(categoryDto);
            }

            responseList.add(productDto);
        }

        return responseList;
    }

    @Override
    public ProductDto getProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);

        // Hata 3: Eski usul if kontrolü
        if(optional.isPresent()) {
            // Hata 1: Dönüşüm mantığı tekrar ediyor
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(optional.get(), productDto);

            if (optional.get().getCategory() != null) {
                ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
                BeanUtils.copyProperties(optional.get().getCategory(), categoryDto);
                productDto.setCategory(categoryDto);
            }

            return productDto;
        }
        return null; // ID bulunamazsa null dönüyor (Daha iyi bir yaklaşım hata fırlatmaktır)
    }

    @Override
    public void deleteProductById(Long id) {
        Optional<Product> optional = productRepository.findById(id);

        // Hata 3: Eski usul if kontrolü
        if(optional.isPresent()) {
            productRepository.delete(optional.get());
        }
    }

    @Override
    public ProductDto updateProduct(Long id, ProductRequestDto productRequestDto) {
        Optional<Product> optional = productRepository.findById(id);

        if(optional.isPresent()) {
            Product dbProduct = optional.get();

            // Kategori kontrolü
            Category category = categoryRepository.findById(productRequestDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            // Hata 2: Kısmi güncelleme yapılmıyor, gelen request'teki tüm alanlar set ediliyor.
            // Eğer request'te bir alan boş gelirse, veritabanında null ile ezilebilir.
            dbProduct.setName(productRequestDto.getName());
            dbProduct.setDescription(productRequestDto.getDescription());
            dbProduct.setPrice(productRequestDto.getPrice());
            dbProduct.setImageUrl(productRequestDto.getImageUrl());
            dbProduct.setCategory(category);
            dbProduct.setStock(productRequestDto.getStock());

            Product savedProduct = productRepository.save(dbProduct);

            // Hata 1: Dönüşüm mantığı tekrar ediyor
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(savedProduct, productDto);

            if (savedProduct.getCategory() != null) {
                ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
                BeanUtils.copyProperties(savedProduct.getCategory(), categoryDto);
                productDto.setCategory(categoryDto);
            }

            return productDto;
        }
        return null; // ID bulunamazsa null dönüyor
    }

    @Override
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<Product> productList = productRepository.findByCategoryId(categoryId);
        List<ProductDto> responseList = new ArrayList<>();

        for(Product product : productList) {
            // Hata 1: Dönüşüm mantığı tekrar ediyor
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product, productDto);

            if (product.getCategory() != null) {
                ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
                BeanUtils.copyProperties(product.getCategory(), categoryDto);
                productDto.setCategory(categoryDto);
            }

            responseList.add(productDto);
        }

        return responseList;
    }

    @Override
    public List<ProductDto> searchProducts(String keyword) {
        List<Product> productList = productRepository.findByNameContainingIgnoreCase(keyword);
        List<ProductDto> responseList = new ArrayList<>();

        for(Product product : productList) {
            // Hata 1: Dönüşüm mantığı tekrar ediyor
            ProductDto productDto = new ProductDto();
            BeanUtils.copyProperties(product, productDto);

            if (product.getCategory() != null) {
                ProductDto.CategoryDto categoryDto = new ProductDto.CategoryDto();
                BeanUtils.copyProperties(product.getCategory(), categoryDto);
                productDto.setCategory(categoryDto);
            }

            responseList.add(productDto);
        }

        return responseList;
    }
}