package com.example.RealEstate.Services;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.AnunturiResponse;
import com.example.RealEstate.Models.Poze;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Repos.AnunturiRepository;
import com.example.RealEstate.Repos.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnunturiServices {
    private final UsersRepository usersRepository;
    private final AnunturiRepository anunturiRepository;

    @Autowired
    public AnunturiServices(AnunturiRepository anunturiRepository, UsersRepository usersRepository) {
        this.anunturiRepository = anunturiRepository;
        this.usersRepository = usersRepository;
    }

    public String addAnunt(AnunturiResponse anunturiResponse, MultipartFile[] poze) throws IOException {

        Users user=usersRepository.findById(anunturiResponse.getUserId()).orElse(null);

        if(user!=null){

            Anunturi anunt=new Anunturi();
            anunt.setTitlu(anunturiResponse.getTitlu());
            anunt.setDescriere(anunturiResponse.getDescriere());
            anunt.setEtaj(anunturiResponse.getEtaj());
            anunt.setNrEtaje(anunturiResponse.getNrEtaje());
            anunt.setAnConstructie(anunturiResponse.getAnConstructie());
            anunt.setPret(anunturiResponse.getPret());
            anunt.setCamere(anunturiResponse.getCamere());
            anunt.setSuprafataUtila(anunturiResponse.getSuprafataUtila());
            anunt.setSuprafataCurte(anunturiResponse.getSuprafataCurte());
            anunt.setUser(user);

            List<Poze> pozeList = new ArrayList<>();
            for (MultipartFile file : poze) {

                String filePath = "/uploads/" + file.getOriginalFilename();
                File destination = new File(filePath);
                file.transferTo(destination); // Save file to disk


                Poze poza = new Poze();
                poza.setPath(filePath);
                poza.setAnunturi(anunt);
                pozeList.add(poza);
            }

            anunt.setPozes(pozeList);

            anunturiRepository.save(anunt);

            return "Anunt added successfully";
        }

        return "Anunt not added";


    }




}
