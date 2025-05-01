package com.example.RealEstate.Controllers;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.AnunturiResponse;
import com.example.RealEstate.Services.AnunturiServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;

@RestController
public class AnunturiController {

 private final AnunturiServices anunturiServices;

    @Autowired
    public AnunturiController(AnunturiServices anunturiServices) {
        this.anunturiServices = anunturiServices;
    }

    @PostMapping("/adaugareAnunt")
    public String adaugareAnunt(@RequestParam("titlu") String titlu,
                                @RequestParam("descriere") String descriere,
                                @RequestParam("etaj") Integer etaj,
                                @RequestParam("nrEtaje") Integer nrEtaje,
                                @RequestParam("anConstructie") LocalDate anConstructie,
                                @RequestParam("pret") Float pret,
                                @RequestParam("camere") Integer camere,
                                @RequestParam("suprafataUtila") Float suprafataUtila,
                                @RequestParam("suprafataCurte") Float suprafataCurte,
                                @RequestParam("userId") int userId,
                                @RequestParam("poze") MultipartFile[] poze) throws IOException {

        AnunturiResponse anunturiResponse = new AnunturiResponse(
                titlu, descriere, etaj, nrEtaje, anConstructie, pret, camere, suprafataUtila, suprafataCurte, userId
        );

        return anunturiServices.addAnunt(anunturiResponse, poze);
    }

}
