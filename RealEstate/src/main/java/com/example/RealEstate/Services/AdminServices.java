package com.example.RealEstate.Services;

import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.Poze;
import com.example.RealEstate.Models.UserRequest;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Repos.AnunturiRepository;
import com.example.RealEstate.Repos.PozeRepository;
import com.example.RealEstate.Repos.UsersRepository;
import com.example.RealEstate.utils.Role;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServices {

    private final UsersRepository usersRepository;
    private final AnunturiRepository anunturiRepository;

    @Autowired
    public AdminServices(UsersRepository usersRepository, AnunturiRepository anunturiRepository) {
        this.usersRepository = usersRepository;
        this.anunturiRepository = anunturiRepository;
    }


    public List<Users> getUsers() {
        return usersRepository.findAll();
    }


    public void addUsers(Users user) {

        Users foundUser = usersRepository.findByEmail(user.getEmail());

        if (foundUser != null) {
            usersRepository.save(user);
        }

    }

    public ResponseEntity<?> deleteUsers(int id) {

        Optional<Users> foundUser = usersRepository.findById(id);

        if (foundUser.isPresent()) {
            List<Anunturi> foundAnunturi = usersRepository.findById(id).get().getAnunturi();
            for (Anunturi anunturi : foundAnunturi) {
                List<Poze> pozas = anunturi.getPozes();
                for (Poze poza : pozas) {
                    File file = new File(poza.getPath());
                    if (file.exists()) {
                        if (file.delete()) {
                            System.out.println("Deleted file: " + poza.getPath());
                        } else {
                            System.out.println("Failed to delete file: " + poza.getPath());
                        }
                    }
                }

            }
            usersRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    public List<Anunturi> getAnunturi() {
        return anunturiRepository.findAll();
    }

    public ResponseEntity<?> deleteAnunturi(int id) {
        Optional<Anunturi> foundAnunturi = anunturiRepository.findById(id);
        if (foundAnunturi.isPresent()) {
            Anunturi anunturi = foundAnunturi.get();
            List<Poze> pozes = anunturi.getPozes();

            for (Poze poza : pozes) {
                File file = new File(poza.getPath());
                if (file.exists()) {
                    if (file.delete()) {
                        System.out.println("Deleted file: " + poza.getPath());
                    } else {
                        System.out.println("Failed to delete file: " + poza.getPath());
                    }
                }
            }

            anunturiRepository.deleteById(id);
       return ResponseEntity.ok().build(); //"Anunturi deleted";
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); //"Anunturi not found";
        }

    }

    public ResponseEntity<?> modificareUtilizator(UserRequest userUpdateRequest) {

        Users foundUser = usersRepository.findByEmail(userUpdateRequest.getOldEmail());

        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {


            foundUser.setPassword(userUpdateRequest.getPassword());
            foundUser.setEmail(userUpdateRequest.getEmail());
            foundUser.setName(userUpdateRequest.getNume());
            foundUser.setRole(userUpdateRequest.getRole());

            usersRepository.save(foundUser);
            return ResponseEntity.ok().build();
        }
    }


}
