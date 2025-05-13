package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.LogInModel;
import com.example.RealEstate.Models.LoginResponse;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LogInController {

    private final UserServices userServices;


    @Autowired
    public LogInController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LogInModel logInModel) {
        Users verifUser= userServices.verifiUser(logInModel);

        if(verifUser!=null){
            return new LoginResponse(verifUser.getId(),verifUser.getRole(),"login succesful");
        }

        return new LoginResponse(null,null,"wrong credentials");
    }

    @PostMapping("/Register")
    public void register(@RequestBody Users user) {

        userServices.addUsers(user);

    }



}
