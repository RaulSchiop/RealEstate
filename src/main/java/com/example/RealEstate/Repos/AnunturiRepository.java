package com.example.RealEstate.Repos;

import com.example.RealEstate.Models.Anunturi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnunturiRepository extends JpaRepository<Anunturi,Integer> {
}
