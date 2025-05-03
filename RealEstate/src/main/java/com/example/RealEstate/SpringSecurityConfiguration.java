package com.example.RealEstate;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable security and allow all requests
        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());  // Allow all requests without authentication
        http.csrf(csrf -> csrf.disable());  // Disable CSRF if needed (e.g., for POST requests from Postman)
        return http.build();
    }
}
