package com.example.RealEstate.Anunturi;

import com.example.RealEstate.Poze.Poze;
import com.example.RealEstate.Users.Users;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Anunturi")
public class Anunturi {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String titlu;
    @Column(nullable = false)
    private String descriere;
    private int etaj;
    private int nrEtaje;
    private LocalDate anConstructie;
    @Column(nullable = false)
    private Float pret;
    @Column(nullable = false)
    private Integer camere;
    @Column(nullable = false)
    private Float suprafataUtila;

    private float suprafataCurte;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @OneToMany(mappedBy = "anunturi", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Poze> pozes = new ArrayList<>();

    public Anunturi() {
    }

    public Anunturi(int id, String titlu, String descriere, int etaj, int nrEtaje, LocalDate anConstructie, Float pret, Integer camere, Float suprafataUtila, float suprafataCurte, Users user, List<Poze> pozes) {
        this.id = id;
        this.titlu = titlu;
        this.descriere = descriere;
        this.etaj = etaj;
        this.nrEtaje = nrEtaje;
        this.anConstructie = anConstructie;
        this.pret = pret;
        this.camere = camere;
        this.suprafataUtila = suprafataUtila;
        this.suprafataCurte = suprafataCurte;
        this.user = user;
        this.pozes = pozes;
    }

    public Anunturi(String titlu, String descriere, int etaj, int nrEtaje, LocalDate anConstructie, Float pret, Integer camere, Float suprafataUtila, float suprafataCurte, Users user, List<Poze> pozes) {
        this.titlu = titlu;
        this.descriere = descriere;
        this.etaj = etaj;
        this.nrEtaje = nrEtaje;
        this.anConstructie = anConstructie;
        this.pret = pret;
        this.camere = camere;
        this.suprafataUtila = suprafataUtila;
        this.suprafataCurte = suprafataCurte;
        this.user = user;
        this.pozes = pozes;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getEtaj() {
        return etaj;
    }

    public void setEtaj(int etaj) {
        this.etaj = etaj;
    }

    public int getNrEtaje() {
        return nrEtaje;
    }

    public void setNrEtaje(int nrEtaje) {
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

    public float getSuprafataCurte() {
        return suprafataCurte;
    }

    public void setSuprafataCurte(float suprafataCurte) {
        this.suprafataCurte = suprafataCurte;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<Poze> getPozes() {
        return pozes;
    }

    public void setPozes(List<Poze> pozes) {
        this.pozes = pozes;
    }


    @Override
    public String toString() {
        return "Anunturi{" +
                "id=" + id +
                ", titlu='" + titlu + '\'' +
                ", descriere='" + descriere + '\'' +
                ", etaj=" + etaj +
                ", nrEtaje=" + nrEtaje +
                ", anConstructie=" + anConstructie +
                ", pret=" + pret +
                ", camere=" + camere +
                ", suprafataUtila=" + suprafataUtila +
                ", suprafataCurte=" + suprafataCurte +
                ", user=" + user +
                ", pozes=" + pozes +
                '}';
    }
}

