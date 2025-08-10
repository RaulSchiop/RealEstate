package com.example.RealEstate.Services;


import com.example.RealEstate.Models.Anunturi;
import com.example.RealEstate.Repos.AnunturiRepository;
import jakarta.annotation.Resource;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
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


            return string.toString();

        }).toList();


        List<Document> documents=anunturis.stream().map(a->
        {
            String contend=a.getTitlu()+' '+a.getDescriere()+' '+a.getLocatie();


            Map<String, Object> metadata = Map.of(
                    "id", a.getId(),
                    "price", a.getPret(),
                    "rooms", a.getCamere(),
                    "floor", a.getEtaj(),
                    "numbers of floors", a.getNrEtaje(),
                    "apartament size", a.getSuprafataUtila()
            );
            return new Document(contend, metadata);
        }).toList();;

        vectorStore.add(documents);

        List<Document> result = vectorStore.similaritySearch(userPrompt);

        String prompt = """
                
                You are a real estate AI assistant always respond in English, even if the property data is in other languages. Use the provided property details below to answer the user’s question.
                
                Property details:
                %s
                
                User question:
                %s
                
                Instructions:
                - Only use information from the property details provided above.
                - If the answer is not in the provided information, respond with: "I don’t have that information right now. Please contact our real estate agent for assistance."
                - Be concise and professional in your response.
                """.formatted(result,userPrompt);


        return chatClient.prompt(prompt).call().content();
    }

    public String chatComparePropriety(){
return "asd";
    }

    public String chatGetProprietiesByPrompt(){
return "asd";
    }



}
