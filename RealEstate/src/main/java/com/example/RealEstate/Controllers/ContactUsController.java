package com.example.RealEstate.Controllers;


import com.example.RealEstate.Models.ContactUs;
import com.example.RealEstate.Services.ContactUsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactUsController {

    private ContactUsServices contactUsServices;

    @Autowired
    public void setContactUsServices(ContactUsServices contactUsServices) {
        this.contactUsServices = contactUsServices;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> saveContactUs(@RequestBody ContactUs contactUs) {
      return  contactUsServices.saveContactUs(contactUs);
    }

}
