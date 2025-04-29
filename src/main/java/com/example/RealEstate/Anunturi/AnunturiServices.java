package com.example.RealEstate.Anunturi;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnunturiServices {
    private final AnunturiRepository anunturiRepository;

    @Autowired
    public AnunturiServices(AnunturiRepository anunturiRepository) {
        this.anunturiRepository = anunturiRepository;
    }

}
