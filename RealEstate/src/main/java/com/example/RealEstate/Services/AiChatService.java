package com.example.RealEstate.Services;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Models.MorgageAiInput;
import com.example.RealEstate.Repos.AnunturiRepository;
import jakarta.annotation.Resource;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.stream.Collectors;

@Service
public class AiChatService {


    public final VectorStore vectorStore;

    public final AnunturiRepository anunturiRepository;
    public final ChatClient chatClient;
    public final Map<Integer, MessageWindowChatMemory> memory =new ConcurrentHashMap<>();

    @Autowired
    public AiChatService(AnunturiRepository anunturiRepository, ChatClient.Builder builder,VectorStore vectorStore) {
        this.anunturiRepository = anunturiRepository;
        this.vectorStore = vectorStore;
        chatClient=builder.build();

    }



     public String ChatBasedOnPropriteies(String userPrompt) {

        List<Anunturi> anunturis = anunturiRepository.findAll();

        List<String> anunturiFormat=anunturis.stream().map(a->{

            StringBuilder string = new StringBuilder();
            string.append("Title: ").append(a.getTitlu()).append("\n");
            string.append("Description: ").append((a.getDescriere()==null?"":a.getDescriere())).append("\n");
            string.append(("Price: ")).append(a.getPret()).append("\n");
            string.append("Apartament size: ").append(a.getSuprafataUtila()).append("\n");
            string.append("Rooms: ").append(a.getCamere()).append("\n");
            string.append("location: ").append((a.getLocatie())).append("\n");
            string.append("Link: ").append("http://localhost:3000/anunturi/").append(a.getId()).append("\n");


            return string.toString();

        }).toList();

//        List<Document> documents=anunturis.stream().map(a->
//        {
//            String contend="Title "+a.getTitlu()+"\n"+" Desctiption"+a.getDescriere()+"\n"+" Price: "+a.getPret()+"\n"+" Rooms: "+a.getCamere()+"\n"+" Floor: "+a.getEtaj()+"\n"+" Apartament Size: "+a.getSuprafataUtila()+"\n" +"Location: "+a.getLocatie()+"\n";
//
//
//            Map<String, Object> metadata = Map.of(
//                    "id", a.getId(),
//
//
//
//                    "numbers of floors", a.getNrEtaje(),
//
//                    "link","http://localhost:3000/anunturi/"+a.getId()
//
//
//
//            );
//            return new Document(contend, metadata);
//        }).toList();
//
//        System.out.println(documents);

//        vectorStore.add(documents);
//
//        List<Document> result = vectorStore.similaritySearch(SearchRequest.builder().query(userPrompt).build());
//        System.out.println(result);



        String prompt = """
                You are a professional real estate AI assistant. Always respond in English, even if the property data is in another language.
                
                Guidelines:
                
                Property Questions:
                
                Use the provided property details as much as possible to answer listing-related questions (price, size, rooms, amenities, etc.).
                
                If you mention a listing, provide a hyperlink: http://localhost:3000/anunturi/{id}
                
                Never show duplicate listings.
                
                If no property matches the user’s request, respond exactly:
                
                “I don’t have that information right now. Please contact our real estate agent for assistance.”
                and include this link: http://localhost:3000/contact
                
                
                City / Neighborhood / General Real Estate Questions:
                
                Use your own knowledge and reasoning to answer. You can search on web too.
                
                Provide helpful insights about areas, lifestyle, investment potential, transportation, schools, amenities, and real estate trends.
                
                Blend these answers naturally with property details if both are relevant.
                
                
                Style:
                
                Be concise, professional, and easy to understand.
                
                Avoid unnecessary repetition.
                
                Proprieties: %s
                
                User Questions: %s
                
                """.formatted(anunturiFormat,userPrompt);


        return chatClient.prompt(prompt).call().content();
    }

    public String chatComparePropriety(){
       return "asd";
    }

    public String chatMorgageCalculator(MorgageAiInput morgageAiInput){

        StringBuilder promptData = new StringBuilder();

        promptData.append("Income: ").append(morgageAiInput.getIncome()).append(" euro").append("\n");
        promptData.append("DownPayment: ").append(morgageAiInput.getDownPayment()).append(" euro").append("\n");
        promptData.append("Rate: ").append(morgageAiInput.getRate()).append("\n");
        promptData.append("Years: ").append(morgageAiInput.getYears()).append("\n");
        promptData.append("Monthly Expenses: ").append(morgageAiInput.getMonthlyExpenses()).append(" euro").append("\n");
        promptData.append("Max debt Ratio: ").append(morgageAiInput.getMaxDebtRatio()).append("\n");


        double monthlyRate = morgageAiInput.getRate() / 12 / 100; // monthly interest rate

        int totalMonths = morgageAiInput.getYears() * 12;        // total number of months


        double maxPayment = (morgageAiInput.getIncome() * morgageAiInput.getMaxDebtRatio() / 100)
                - morgageAiInput.getMonthlyExpenses();


        double maxPaymantModerate=maxPayment*0.7;
        double maxPaymantConservative=maxPayment*0.5;

        double Denominator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
        double mortgagePrincipalAgresive = maxPayment * (Math.pow(1 + monthlyRate, totalMonths) - 1)
                / Denominator;

        double mortgagePrincipalModerate= maxPaymantModerate * (Math.pow(1 + monthlyRate, totalMonths) - 1)
                / Denominator;

        double mortgagePrincipalConservative = maxPaymantConservative * (Math.pow(1 + monthlyRate, totalMonths) - 1)
                / Denominator;


        double apartmentPriceAggresive = mortgagePrincipalAgresive + morgageAiInput.getDownPayment();

        double apartmentPriceModerate = mortgagePrincipalModerate + morgageAiInput.getDownPayment();

        double apartmentPriceConsevative = mortgagePrincipalConservative + morgageAiInput.getDownPayment();





        String Prompt = """
You are a professional mortgage advisor. Based on the following financial details, provide a comprehensive mortgage affordability analysis.

Financial Details:
%s

Calculate:
1. Maximum affordable mortgage principal.
2. Estimated monthly payment.
3. Maximum apartment price including down payment.

Additionally, provide practical guidance for the user based on the mode by listing:
- 5 Dos (best practices for managing mortgage and finances)
- 5 Don'ts (common mistakes to avoid)
- Provide a type of apartament that you can get with this morgage principal based on the city provided %s if the money is too low or at limit say that you cant afford to buy in that city.
Return ONLY valid JSON output in the format specified below. Do not include any explanations or extra text no json at top .
[
{
  "mode":"Aggressive",
  "mortgage_affordable": %.2f,
  "monthly_payment": %.2f,
  "apartment_price": %.2f,
  "dos": [
    "Do 1",
    "Do 2",
    "Do 3",
    "Do 4",
    "Do 5"
  ],
  "donts": [
    "Don't 1",
    "Don't 2",
    "Don't 3",
    "Don't 4",
    "Don't 5"
  ],
  "apartamentType":<string>
}
,
{
  "mode":"Moderate",
  "mortgage_affordable": %.2f,
  "monthly_payment": %.2f,
  "apartment_price": %.2f,
  "dos": [
    "Do 1",
    "Do 2",
    "Do 3",
    "Do 4",
    "Do 5"
  ],
  "donts": [
    "Don't 1",
    "Don't 2",
    "Don't 3",
    "Don't 4",
    "Don't 5"
  ]
  "apartamentType":<string>
},
{
  "mode":"Conservative",
  "mortgage_affordable": %.2f,
  "monthly_payment": %.2f,
  "apartment_price": %.2f,
  "dos": [
    "Do 1",
    "Do 2",
    "Do 3",
    "Do 4",
    "Do 5"
  ],
  "donts": [
    "Don't 1",
    "Don't 2",
    "Don't 3",
    "Don't 4",
    "Don't 5"
  ],
  "apartamentType":<string>
}

]
""".formatted(
               promptData,
                morgageAiInput.getCity(),
                mortgagePrincipalAgresive,
                maxPayment,
                apartmentPriceAggresive,
                mortgagePrincipalModerate,
                maxPaymantModerate,
                apartmentPriceModerate,
                mortgagePrincipalConservative,
                maxPaymantConservative,
                apartmentPriceConsevative
        );




        return chatClient.prompt(Prompt).call().content();

    }



}
