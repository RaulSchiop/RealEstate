package com.example.RealEstate.Controllers;

import com.example.RealEstate.Models.NewsLetter;
import com.example.RealEstate.Repos.NewsLetterRepository;
import com.example.RealEstate.Services.NewsLetterServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsLetterController {
    private final NewsLetterServices newsLetterServices;

    @Autowired
    public NewsLetterController(NewsLetterServices newsLetterServices) {
        this.newsLetterServices = newsLetterServices;
    }

    @PostMapping("/newsLetter")
    public ResponseEntity<?> addEmailNewsLetter(@RequestBody NewsLetter newsLetter) {
     return  newsLetterServices.addNewsLetter(newsLetter);
    }


}
