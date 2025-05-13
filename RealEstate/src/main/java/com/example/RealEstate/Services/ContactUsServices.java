package com.example.RealEstate.Services;

import com.example.RealEstate.Models.ContactUs;
import com.example.RealEstate.Repos.ContactUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContactUsServices {

    private final ContactUsRepository contactUsRepository;

    @Autowired
    public ContactUsServices( ContactUsRepository contactUsRepository1) {
        this.contactUsRepository = contactUsRepository1;
    }


    public ResponseEntity<?> saveContactUs(ContactUs contactUs) {

        contactUsRepository.save(contactUs);
        return ResponseEntity.ok().build();

    }

}
