package com.example.RealEstate.Poze;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PozeRepository extends JpaRepository<Poze, Integer> {
}
