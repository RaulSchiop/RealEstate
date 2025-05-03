package com.example.RealEstate.Services;

import com.example.RealEstate.Repos.PozeRepository;
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
