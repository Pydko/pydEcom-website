package com.ecommerce.service.impl;

import com.ecommerce.entities.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import org.springframework.security.core.authority.SimpleGrantedAuthority; // YENİ İMPORT
import java.util.Collections; // KALDIRILACAK
import java.util.List; // YENİ İMPORT

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // ----------------------------------------------------------------------
        // KRİTİK DÜZELTME BAŞLANGIÇ: Kullanıcının rolünü (USER) Spring Security formatına (ROLE_USER) dönüştür
        // ----------------------------------------------------------------------

        // Veritabanındaki rol bilgisini al (Örn: "USER")
        String userRole = user.getRole();

        // Spring Security'nin beklediği SimpleGrantedAuthority listesini oluştur.
        // Rol isminin başına 'ROLE_' öneki eklenmesi Spring Security kuralıdır.
        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + userRole));

        // ----------------------------------------------------------------------
        // KRİTİK DÜZELTME BİTİŞ
        // ----------------------------------------------------------------------

        // 2. Spring Security'nin UserDetails nesnesini oluştur
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities // Boş liste yerine artık yetki listesi (authorities) kullanılıyor.
        );
    }
}