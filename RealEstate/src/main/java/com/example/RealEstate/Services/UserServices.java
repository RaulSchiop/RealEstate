package com.example.RealEstate.Services;

import com.example.RealEstate.Models.LogInModel;
import com.example.RealEstate.Models.Users;
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

        Users existingUser=usersRepository.findByEmail(logInModel.getEmail());

        if(existingUser!=null && encoder.matches(logInModel.getPassword(),existingUser.getPassword())){
            return existingUser;
        }
    return null;

    }

    public void addUsers(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        usersRepository.save(user);
    }


}
