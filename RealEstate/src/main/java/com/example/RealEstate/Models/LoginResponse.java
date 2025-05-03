package com.example.RealEstate.Models;

import com.example.RealEstate.utils.Role;

public class LoginResponse {
    private Integer id;
    private Role role;
    private String message;


    public LoginResponse(Integer id, Role role, String message) {
        this.id = id;
        this.role = role;
        this.message = message;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
