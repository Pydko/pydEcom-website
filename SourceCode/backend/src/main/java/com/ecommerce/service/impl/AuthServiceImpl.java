package com.ecommerce.service.impl;

import com.ecommerce.dto.AuthRequestDto;
import com.ecommerce.dto.AuthResponseDto;
import com.ecommerce.entities.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.service.IAuthService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements IAuthService {

    // Başlangıç: Tüm bağımlılıklar için sadece @Autowired kullanılıyor
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public AuthResponseDto register(AuthRequestDto authRequestDto, String email) {
        // Kontroller orijinal haliyle bırakıldı
        if (userRepository.existsByUsername(authRequestDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        // Yeni kullanıcı oluşturma
        User user = new User();
        user.setUsername(authRequestDto.getUsername());
        // Parolayı şifreleme unutulmadı, doğru!
        user.setPassword(passwordEncoder.encode(authRequestDto.getPassword()));
        user.setEmail(email);
        user.setRole("USER");

        User savedUser = userRepository.save(user);

        // Hata 2: DTO oluşturma mantığı tekrarlanıyor
        String token = jwtUtil.generateToken(savedUser.getUsername());

        AuthResponseDto response = new AuthResponseDto();
        response.setToken(token);
        response.setUsername(savedUser.getUsername());
        response.setEmail(savedUser.getEmail());
        response.setRole(savedUser.getRole());

        return response;
    }

    @Override
    public AuthResponseDto login(AuthRequestDto authRequestDto) {
        // Kullanıcıyı veritabanında bulma
        User user = userRepository.findByUsername(authRequestDto.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Parola kontrolü
        if (!passwordEncoder.matches(authRequestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Hata 2: DTO oluşturma mantığı tekrarlanıyor
        String token = jwtUtil.generateToken(user.getUsername());

        AuthResponseDto response = new AuthResponseDto();
        response.setToken(token);
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());

        return response;
    }
}