package com.example.RealEstate.Services;

import com.example.RealEstate.Models.NewsLetter;
import com.example.RealEstate.Repos.NewsLetterRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class NewsLetterServices {

    private final NewsLetterRepository newsLetterRepository;

    @Autowired
    public NewsLetterServices(NewsLetterRepository newsLetterRepository) {
        this.newsLetterRepository = newsLetterRepository;
    }


    public ResponseEntity<?> addNewsLetter( NewsLetter newsLetter) {

      NewsLetter foundUSer =  newsLetterRepository.findByEmail(newsLetter.getEmail());
        if(foundUSer != null){
            newsLetterRepository.save(newsLetter);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }


}
