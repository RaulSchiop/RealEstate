package com.example.RealEstate;

import com.example.RealEstate.Security.JwtAuthenticationFilter;
import jakarta.servlet.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SpringSecurityConfiguration {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.ignoringRequestMatchers("/auth/**", "/newsLetter", "/admin/**", "/anunturi/**", "/contact","/chat/**"))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/anunturi").permitAll()
                        .requestMatchers("/anunturi/anunt/{id}").permitAll()
                        .requestMatchers("/anunturi/anunturi4").permitAll()
                        .requestMatchers("/newsLetter").permitAll()
                        .requestMatchers("/contact").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .requestMatchers("/error").permitAll()    // <-- Add this line
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/admin/deleteAnunt/{id}").hasRole("ADMIN")
                        .requestMatchers("/admin/modificareUtilizator").hasRole("ADMIN")
                        .requestMatchers("/anunturi/adaugareAnunt").hasAnyRole("CLIENT", "ADMIN")
                        .requestMatchers("/chat/Prompt").permitAll()
                        .requestMatchers("/chat/MorgageAi").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
