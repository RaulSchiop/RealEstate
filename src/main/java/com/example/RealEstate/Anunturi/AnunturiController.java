package com.example.RealEstate.Anunturi;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnunturiController {

 private final AnunturiServices anunturiServices;

    @Autowired
    public AnunturiController(AnunturiServices anunturiServices) {
        this.anunturiServices = anunturiServices;
    }
}
