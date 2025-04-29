package com.example.RealEstate.Poze;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PozeController {
    private final PozeServices pozeServices;

    @Autowired
    public PozeController(PozeServices pozeServices) {
        this.pozeServices = pozeServices;
    }
}

