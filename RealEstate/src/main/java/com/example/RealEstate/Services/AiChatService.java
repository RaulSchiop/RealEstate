package com.example.RealEstate.Services;


import com.example.RealEstate.Models.Anunturi;
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

//
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
               You are a professional real estate AI assistant. Always respond in English, even if the property data is in another language. Use only the provided property details to answer the user’s question.
               
               Property details:
               %s
                
               User question:
               %s
                
                  
               Instructions:
                
               - Use the property details as much as possible to answer listing-related questions, but you can use general knowledge to answer other types of questions.
               - For questions about neighborhoods, city areas, or general real estate advice, answer using your own knowledge and reasoning.
               - Avoid returning duplicate listings. Each property should appear only once.
               - When referencing a listing page, provide a hyperlink: http://localhost:3000/anunturi/{id}
               - If no property matches the user’s criteria, respond exactly, and provide a hyperlink to http://localhost:3000/contact
               “I don’t have that information right now. Please contact our real estate agent for assistance.”
               - Be concise and professional.
                """.formatted(anunturiFormat,userPrompt);


        return chatClient.prompt(prompt).call().content();
    }

    public String chatComparePropriety(){
       return "asd";
    }

    public String chatMorgageCalculator(){
return "asd";
    }



}
