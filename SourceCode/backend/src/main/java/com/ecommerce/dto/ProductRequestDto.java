package com.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class ProductRequestDto {

    @NotBlank(message = "Product name required")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String name;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    private String imageUrl;

    @NotNull(message = "Category is required")
    private Long categoryId;

    @NotNull(message = "Stock required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
}