package com.example.RealEstate.Services;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.AnunturiResponse;
import com.example.RealEstate.Models.Poze;
import com.example.RealEstate.Models.Users;
import com.example.RealEstate.Repos.AnunturiRepository;
import com.example.RealEstate.Repos.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;



@Service
public class AnunturiServices {
    private final UsersRepository usersRepository;
    private final AnunturiRepository anunturiRepository;

    @Autowired
    public AnunturiServices(AnunturiRepository anunturiRepository, UsersRepository usersRepository) {
        this.anunturiRepository = anunturiRepository;
        this.usersRepository = usersRepository;
    }


    public List<Anunturi> getAllAnunturi(){

        return anunturiRepository.findAll();

    }

    public List<Anunturi> get4Anunturi(){
        return anunturiRepository.get4Anunturi();
    }

    public ResponseEntity<?> addAnunt(AnunturiResponse anunturiResponse, MultipartFile[] poze) {

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
            anunt.setNrTel(anunturiResponse.getNrTel());
            anunt.setLocatie(anunturiResponse.getLocatie());


            List<Poze> pozeList = new ArrayList<>();
            String uploadDir = "/Users/raulschiop/Downloads/project/RealEstate/uploads";

            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();
            }


            for (MultipartFile file : poze) {
                String originalFileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
                String filePath = UUID.randomUUID().toString() + "_" + originalFileName;
                String absoluteFilePath = uploadDirectory.getAbsolutePath() + File.separator + filePath;
                File destination = new File(absoluteFilePath);
                try {
                    file.transferTo(destination);

                    Poze poza = new Poze();
                    poza.setPath(filePath);
                    poza.setAnunturi(anunt);
                    pozeList.add(poza);
                } catch (IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
            }

            anunt.setPozes(pozeList);

            anunturiRepository.save(anunt);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();


    }




}
