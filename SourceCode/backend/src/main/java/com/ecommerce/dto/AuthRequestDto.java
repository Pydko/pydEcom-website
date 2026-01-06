package com.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AuthRequestDto {

    @NotBlank(message = "Username required")
    private String username;

    @NotBlank(message = "Password required")
    private String password;
}