package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.UserRequest;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Services.AdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminServices adminServices;

    @Autowired
    public AdminController(AdminServices adminServices) {
        this.adminServices = adminServices;
    }

    @GetMapping("/users")
    List<Users> getUsers() {
        return adminServices.getUsers();
    }


    @PostMapping("/addUsers")
    public void addUsers(@RequestBody Users user) {

        adminServices.addUsers(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUsers(@PathVariable int id) {

        return adminServices.deleteUsers(id);

    }

    @GetMapping("/getAnunturi")
    public List<Anunturi> getAnunturi() {
        return adminServices.getAnunturi();
    }

    @DeleteMapping("/deleteAnunt/{id}")
    public ResponseEntity<?> deleteAnunturi(@PathVariable int id) {

        return adminServices.deleteAnunturi(id);
    }

    @PostMapping("/modificareUtilizator")
    public ResponseEntity<?> modificareUtilizator(@RequestBody UserRequest userUpdateRequest) {
        return adminServices.modificareUtilizator(userUpdateRequest);
    }


}
