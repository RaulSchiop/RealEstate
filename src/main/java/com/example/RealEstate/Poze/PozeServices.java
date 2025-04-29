package com.example.RealEstate.Poze;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PozeServices {

    private final PozeRepository pozeRepository;

    @Autowired
    public PozeServices(PozeRepository pozeRepository) {
        this.pozeRepository = pozeRepository;
    }
}
