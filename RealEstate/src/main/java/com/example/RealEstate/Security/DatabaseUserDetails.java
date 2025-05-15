package com.example.RealEstate.Security;

import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Repos.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
class DatabaseUserDetails implements UserDetailsService {

    private final UsersRepository usersRepository;

    DatabaseUserDetails(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users userFromDatabase = usersRepository.findByName((username));

        if (userFromDatabase == null) {
            throw new UsernameNotFoundException(username);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(userFromDatabase.getName())
                .password(userFromDatabase.getPassword())
                .roles(userFromDatabase.getRole().name())
                .build();
    }
}
