package com.example.RealEstate.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsersReqest {

    String name;
    String email;
    String password;

}
