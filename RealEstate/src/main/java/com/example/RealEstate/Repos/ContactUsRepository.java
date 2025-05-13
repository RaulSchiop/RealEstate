package com.example.RealEstate.Repos;

import com.example.RealEstate.Models.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsRepository extends JpaRepository<ContactUs,Integer> {
}
