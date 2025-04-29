package com.example.RealEstate.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersController {

    private final UserServices userServices;

    @Autowired
    public UsersController(UserServices userServices) {
        this.userServices = userServices;
    }

    @GetMapping("/users")
    public List<Users> getAllUsers(){
        return userServices.getUsers();
    }

    @PostMapping("/users")
    public void addUsers(@RequestBody Users users){
        userServices.addUsers(users);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUsers(@PathVariable int id){
        userServices.deleteUser(id);
    }


}
