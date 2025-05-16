package com.example.RealEstate.Models;

import com.example.RealEstate.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequest {
        private String oldEmail;
        private int id;
        private String name;
        private String email;
        private String password;
        private Role role;

}
