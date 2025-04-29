package com.example.RealEstate.Repos;

import com.example.RealEstate.Models.Poze;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PozeRepository extends JpaRepository<Poze, Integer> {
}
