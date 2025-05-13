package com.example.RealEstate.Models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "newsLetter")
public class NewsLetter {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String email;

}

