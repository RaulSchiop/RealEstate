package com.example.RealEstate.Repos;

import com.example.RealEstate.Models.NewsLetter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsLetterRepository extends JpaRepository<NewsLetter,Integer> {
    List<NewsLetter> findByEmail(String email);

}
