package com.ecommerce.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class ProductDto {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private CategoryDto category;
    private Integer stock;

    @Data
    @Getter
    @Setter
    public static class CategoryDto {
        private Long id;
        private String name;
        private String description;
    }
}