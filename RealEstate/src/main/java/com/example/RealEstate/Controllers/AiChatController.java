package com.example.RealEstate.Controllers;


import com.example.RealEstate.Models.MorgageAiInput;
import com.example.RealEstate.Services.AiChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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


    @PostMapping("/MorgageAi")
    public String morgageAi(@RequestParam("income") float income,
                            @RequestParam("downPayment") float downPayment,
                            @RequestParam("rate") float rate,
                            @RequestParam("years") int years,
                            @RequestParam("monthlyExpenses") float monthyExpenses,
                            @RequestParam("maxDebtRatio") float maxDebtRatio,

                            @RequestParam("city") String city
                            ){

        MorgageAiInput morgageAiInput = new MorgageAiInput(income,downPayment,rate,years,monthyExpenses,maxDebtRatio,city);

        return aiChatService.chatMorgageCalculator(morgageAiInput);



    }



    @PostMapping("/CompareAi")
    public String compareAi(@RequestBody List<Integer> Id){
        return aiChatService.chatComparePropriety(Id);
    }



}
