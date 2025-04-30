package com.example.RealEstate.Models;

import com.example.RealEstate.utils.Role;

public class UserRequest {
        private String oldEmail;

        private int id;
        private String nume;
        private String email;
        private String password;
        private Role role;

    public UserRequest(String oldEmail, int id, String nume, String email, String password, Role role) {
        this.oldEmail = oldEmail;
        this.id = id;
        this.nume = nume;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public String getOldEmail() {
        return oldEmail;
    }

    public void setOldEmail(String oldEmail) {
        this.oldEmail = oldEmail;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
