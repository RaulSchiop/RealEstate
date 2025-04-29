package com.example.RealEstate.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    private final UsersRepository usersRepository;
    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);
    @Autowired
    public UserServices(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public List<Users> getUsers(){
        return usersRepository.findAll();
    }

    public void addUsers(Users users){
        users.setPassword(encoder.encode(users.getPassword()));
        usersRepository.save(users);
    }

    public void deleteUser(int id) {
    if(usersRepository.existsById(id)){
        usersRepository.deleteById(id);
    }else {
        System.out.println("User not found");
    }
    }

}
