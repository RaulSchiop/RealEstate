package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.LogInModel;
import com.example.RealEstate.Models.LoginResponse;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Models.UsersReqest;
import com.example.RealEstate.Security.JwtUtil;
import com.example.RealEstate.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/auth")
public class LogInController {

    private final UserServices userServices;
    private final JwtUtil jwtUtil;

    @Autowired
    public LogInController(UserServices userServices, JwtUtil jwtUtil) {
        this.userServices = userServices;
        this.jwtUtil = jwtUtil;

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LogInModel loginModel) {
        System.out.println(loginModel);

        Users verifUser = userServices.verifiUser(loginModel);

        if (verifUser != null) {
            String token = jwtUtil.generateToken(verifUser.getEmail());
            return ResponseEntity.ok(new LoginResponse(verifUser.getId(), verifUser.getRole(), token));
        }
        return ResponseEntity.status(401).body(new LoginResponse(null, null, "wrong credentials"));
    }

    @PostMapping("/Register")
    public void register(@RequestBody UsersReqest user) {
        userServices.addUsers(user);
    }


}
