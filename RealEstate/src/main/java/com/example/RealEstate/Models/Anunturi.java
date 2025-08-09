package com.example.RealEstate.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Anunturi")
public class Anunturi {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String titlu;
    @Column(nullable = false)
    private String descriere;
    private Integer etaj;
    @Column(name = "nr_etaje")
    private Integer nrEtaje;


    @Column(name = "an_constructie" , nullable = false)
    private LocalDate anConstructie;

    @Column(nullable = false)
    private Float pret;
    @Column(nullable = false)
    private Integer camere;
    @Column(nullable = false)
    private Float suprafataUtila;

    private float suprafataCurte;

    @Column(name = "nrTel")
    private String nrTel;

    private String locatie;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    @JsonIgnoreProperties({"anunturi"})
    private Users user;

    @OneToMany(mappedBy = "anunturi", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Poze> pozes = new ArrayList<>();

}

