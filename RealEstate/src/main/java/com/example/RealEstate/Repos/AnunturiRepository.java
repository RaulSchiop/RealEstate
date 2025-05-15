package com.example.RealEstate.Repos;

import com.example.RealEstate.Models.Anunturi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnunturiRepository extends JpaRepository<Anunturi,Integer> {
    List<Anunturi> findByUserId(int userId);

    @Query(value = "SELECT * FROM anunturi LIMIT 4", nativeQuery = true)
    List<Anunturi> get4Anunturi();




}
