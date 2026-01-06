package com.ecommerce.service;

import com.ecommerce.dto.AuthRequestDto;
import com.ecommerce.dto.AuthResponseDto;

public interface IAuthService {
    AuthResponseDto register(AuthRequestDto authRequestDto, String email);
    AuthResponseDto login(AuthRequestDto authRequestDto);
}