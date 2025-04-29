package com.example.RealEstate.Users;

import com.example.RealEstate.Anunturi.Anunturi;
import com.example.RealEstate.utils.Role;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Users")
public class Users {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anunturi> anunturi = new ArrayList<>();

    public Users() {
        this.role = Role.CLIENT;
    }

    public Users(int id, String name, String email, String password, Role role, List<Anunturi> anunturi) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.anunturi = anunturi;
    }

    public Users(String name, String email, String password, Role role, List<Anunturi> anunturi) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.anunturi = anunturi;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Anunturi> getAnunturi() {
        return anunturi;
    }

    public void setAnunturi(List<Anunturi> anunturi) {
        this.anunturi = anunturi;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", anunturi=" + anunturi +
                '}';
    }
}
