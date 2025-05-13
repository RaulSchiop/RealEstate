package com.example.RealEstate.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnunturiResponse {

    private String titlu;
    private String descriere;
    private Integer etaj;
    private Integer nrEtaje;
    private LocalDate anConstructie;
    private Float pret;
    private Integer camere;
    private Float suprafataUtila;
    private Float suprafataCurte;
    private String nrTel;
    private String locatie;
    private int userId;

}
