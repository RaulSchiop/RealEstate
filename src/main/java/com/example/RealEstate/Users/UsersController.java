package com.example.RealEstate.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {

    private final UserServices userServices;

    @Autowired
    public UsersController(UserServices userServices) {
        this.userServices = userServices;
    }
}
