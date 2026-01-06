package com.ecommerce.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthResponseDto {
    private String token;
    private String username;
    private String email;
    private String role;
}