package com.example.RealEstate.Services;

import com.example.RealEstate.Models.NewsLetter;
import com.example.RealEstate.Repos.NewsLetterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@Service
public class NewsLetterServices {

    private final NewsLetterRepository newsLetterRepository;

    @Autowired
    public NewsLetterServices(NewsLetterRepository newsLetterRepository) {
        this.newsLetterRepository = newsLetterRepository;
    }



    public ResponseEntity<?> addNewsLetter(NewsLetter newsLetter) {
        String email = newsLetter.getEmail().trim();
        System.out.println("Attempting to add email: " + email);

        List<NewsLetter> existingEntries = newsLetterRepository.findByEmail(email);

        if (!existingEntries.isEmpty()) {
            System.out.println("Email already exists in the database.");
            return ResponseEntity.status(409).body("Email already subscribed to the newsletter.");
        }

        newsLetter.setEmail(email);
        newsLetterRepository.save(newsLetter);
        System.out.println("Email saved successfully: " + email);
        return ResponseEntity.ok().build();
    }


}
