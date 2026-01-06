package com.ecommerce.controller;

import com.ecommerce.dto.AuthRequestDto;
import com.ecommerce.dto.AuthResponseDto;
import com.ecommerce.service.IAuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @PostMapping("/register")
    public AuthResponseDto register(@Valid @RequestBody AuthRequestDto authRequestDto,
                                    @RequestParam("email") String email) {
        return authService.register(authRequestDto, email);
    }

    @PostMapping("/login")
    public AuthResponseDto login(@Valid @RequestBody AuthRequestDto authRequestDto) {
        return authService.login(authRequestDto);
    }
}