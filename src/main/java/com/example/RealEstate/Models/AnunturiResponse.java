package com.example.RealEstate.Models;

import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

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

    private int userId;

    public AnunturiResponse(String titlu, String descriere, Integer etaj, Integer nrEtaje, LocalDate anConstructie, Float pret, Integer camere, Float suprafataUtila, Float suprafataCurte, int userId) {
        this.titlu = titlu;
        this.descriere = descriere;
        this.etaj = etaj;
        this.nrEtaje = nrEtaje;
        this.anConstructie = anConstructie;
        this.pret = pret;
        this.camere = camere;
        this.suprafataUtila = suprafataUtila;
        this.suprafataCurte = suprafataCurte;
        this.userId = userId;
    }

    public String getTitlu() {
        return titlu;
    }

    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public Integer getEtaj() {
        return etaj;
    }

    public void setEtaj(Integer etaj) {
        this.etaj = etaj;
    }

    public Integer getNrEtaje() {
        return nrEtaje;
    }

    public void setNrEtaje(Integer nrEtaje) {
        this.nrEtaje = nrEtaje;
    }

    public LocalDate getAnConstructie() {
        return anConstructie;
    }

    public void setAnConstructie(LocalDate anConstructie) {
        this.anConstructie = anConstructie;
    }

    public Float getPret() {
        return pret;
    }

    public void setPret(Float pret) {
        this.pret = pret;
    }

    public Integer getCamere() {
        return camere;
    }

    public void setCamere(Integer camere) {
        this.camere = camere;
    }

    public Float getSuprafataUtila() {
        return suprafataUtila;
    }

    public void setSuprafataUtila(Float suprafataUtila) {
        this.suprafataUtila = suprafataUtila;
    }

    public Float getSuprafataCurte() {
        return suprafataCurte;
    }

    public void setSuprafataCurte(Float suprafataCurte) {
        this.suprafataCurte = suprafataCurte;
    }



    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
