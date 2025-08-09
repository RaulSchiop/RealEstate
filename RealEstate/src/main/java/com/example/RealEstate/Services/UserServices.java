package com.example.RealEstate.Services;

import com.example.RealEstate.Models.LogInModel;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Models.UsersReqest;
import com.example.RealEstate.Repos.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UserServices {

    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    @Autowired
    public UserServices(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public Users verifiUser(LogInModel logInModel) {
        Users existingUser = usersRepository.findByEmail(logInModel.getEmail());
        System.out.println("User found: " + (existingUser != null));

        if (existingUser != null) {
            boolean matches = encoder.matches(logInModel.getPassword(), existingUser.getPassword());
            System.out.println("Password matches: " + matches);
            if (matches) {
                return existingUser;
            }
        }
        return null;
    }


    public void addUsers(UsersReqest user) {
        Users existingUser = usersRepository.findByEmail(user.getEmail());
        if (existingUser != null) {

            throw new RuntimeException("User already exists");
        }
        String encodedPassword = encoder.encode(user.getPassword());

        Users newUser = new Users(user.getName(), user.getEmail(), encodedPassword);
        usersRepository.save(newUser);
    }




}
