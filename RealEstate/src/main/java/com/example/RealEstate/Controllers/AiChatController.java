package com.example.RealEstate.Controllers;


import com.example.RealEstate.Services.AiChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/chat")
public class AiChatController {

    public final AiChatService aiChatService;


    @Autowired
    public AiChatController(AiChatService aiChatService) {
        this.aiChatService = aiChatService;
    }

    @PostMapping("/Prompt")
    public Map<String, String> prompt(@RequestBody String prompt){
        String response = aiChatService.ChatBasedOnPropriteies(prompt);
        return Map.of("response", response);
    }



}
