package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.UserRequest;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Services.AdminServices;
import com.example.RealEstate.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class AdminController {

    private final AdminServices adminServices;

    @Autowired
    public AdminController(AdminServices adminServices) {
        this.adminServices = adminServices;
    }

    @GetMapping("/Admin/users")
    List<Users> getUsers() {
        return adminServices.getUsers();
    }


    @PostMapping("/Admin/addUsers")
    public void addUsers(@RequestBody Users user) {

        adminServices.addUsers(user);
    }

    @DeleteMapping("/Admin/deleteUser/{id}")
    public String deleteUsers(@PathVariable int id) {

        return adminServices.deleteUsers(id);

    }

    @GetMapping("/Admin/getAnunturi")
    public List<Anunturi> getAnunturi() {
        return adminServices.getAnunturi();
    }

    @DeleteMapping("/Admin/deleteAnunt/{id}")
    public String deleteAnunturi(@PathVariable int id) {

        return adminServices.deleteAnunturi(id);
    }

    @PostMapping("/Admin/modificareUtilizator")
    public String modificareUtilizator(@RequestBody UserRequest userUpdateRequest) {
        return adminServices.modificareUtilizator(userUpdateRequest);
    }


}
