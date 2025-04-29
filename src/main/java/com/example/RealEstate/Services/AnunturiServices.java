package com.example.RealEstate.Services;


import com.example.RealEstate.Repos.AnunturiRepository;
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
