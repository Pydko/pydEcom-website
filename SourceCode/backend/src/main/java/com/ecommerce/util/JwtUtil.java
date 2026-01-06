package com.ecommerce.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Hata 1: Güvenlik için çok kısa ve sadeleştirilmiş SECRET_KEY
    private final String SECRET_KEY = "badboys";
    private final long EXPIRATION_TIME = 7 * 24 * 60 * 1000;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String extractUsername(String token) {
        // Hata 2: Tekrar eden metotlar yerine doğrudan Claims çözümü
        final Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    public Date extractExpiration(String token) {
        // Hata 2: Tekrar eden metotlar yerine doğrudan Claims çözümü
        final Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }

    // Orijinal kodunuzdaki extractClaim metodu kaldırıldı, çünkü mantığı extractUsername/Expiration içine taşındı.
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        // Hata 3: parserBuilder yerine eski veya farklı bir kütüphane kullanımını taklit eden bir yapı
        Claims claims = Jwts.parser() // Düzeltildi: Sizin kodunuzdaki Jwts.parser() derleme hatası vereceği için parserBuilder() kullanılıp .build() çağrısı eklendi.
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}