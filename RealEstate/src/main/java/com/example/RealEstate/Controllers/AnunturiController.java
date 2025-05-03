package com.example.RealEstate.Controllers;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.AnunturiResponse;
import com.example.RealEstate.Services.AnunturiServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/anunturi")
public class AnunturiController {

 private final AnunturiServices anunturiServices;

    @Autowired
    public AnunturiController(AnunturiServices anunturiServices) {
        this.anunturiServices = anunturiServices;
    }

    @GetMapping
    public List<Anunturi> getAllAnunturi(){
        return anunturiServices.getAllAnunturi();
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
                                @RequestParam("nrTel") String nrTel,
                                @RequestParam("userId") int userId,
                                @RequestParam("poze") MultipartFile[] poze) throws IOException {

        AnunturiResponse anunturiResponse = new AnunturiResponse(
                titlu, descriere, etaj, nrEtaje, anConstructie, pret, camere, suprafataUtila, suprafataCurte, nrTel, userId
        );

        return anunturiServices.addAnunt(anunturiResponse, poze);
    }

}
