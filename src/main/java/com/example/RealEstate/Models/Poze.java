package com.example.RealEstate.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Poze")
public class Poze {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String path;

    @ManyToOne
    @JoinColumn(name = "product_Id", nullable = false)
    private Anunturi anunturi;

    public Poze() {
    }

    public Poze(int id, String path, Anunturi anunturi) {
        this.id = id;
        this.path = path;
        this.anunturi = anunturi;
    }

    public Poze(String path, Anunturi anunturi) {
        this.path = path;
        this.anunturi = anunturi;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Anunturi getAnunturi() {
        return anunturi;
    }

    public void setAnunturi(Anunturi anunturi) {
        this.anunturi = anunturi;
    }

    @Override
    public String toString() {
        return "Poze{" +
                "id=" + id +
                ", path='" + path + '\'' +
                ", anunturi=" + anunturi +
                '}';
    }
}
