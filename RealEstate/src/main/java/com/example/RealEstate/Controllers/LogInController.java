package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.LoginResponse;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogInController {

    private final UserServices userServices;


    @Autowired
    public LogInController(UserServices userServices) {
        this.userServices = userServices;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody Users user) {
        Users verifUser= userServices.verifiUser(user);

        if(verifUser!=null){
            return new LoginResponse(user.getId(),user.getRole(),"login succesful");
        }

        return new LoginResponse(null,null,"wrong credentials");
    }

    @PostMapping("/Register")
    public void register(@RequestBody Users user) {

        userServices.addUsers(user);

    }



}
