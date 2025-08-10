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


            return string.toString();

        }).toList();


        List<Document> documents=anunturis.stream().map(a->
        {
            String contend="Title "+a.getTitlu()+" Desctiption"+a.getDescriere();


            Map<String, Object> metadata = Map.of(
                    "id", a.getId(),
                    "price", a.getPret(),
                    "rooms", a.getCamere(),
                    "floor", a.getEtaj(),
                    "numbers of floors", a.getNrEtaje(),
                    "apartament size", a.getSuprafataUtila(),
                    "link","http://localhost:3000/anunturi/"+a.getId(),
                    "location",a.getLocatie()


            );
            return new Document(contend, metadata);
        }).toList();

        System.out.println(documents);

        vectorStore.add(documents);

        List<Document> result = vectorStore.similaritySearch(SearchRequest.builder().query(userPrompt).build());
        System.out.println(result);

        String prompt = """
                You are a real estate AI assistant. Always respond in English, even if the property data is in other languages. Use the provided property details below to answer the user’s question.
                
                Property details:
                %s
                
                User question:
                %s
                
                Instructions:
                - Only use information from the property details provided above.
                - Always respond with up to 5 relevant properties.
                - If the user explicitly asks for multiple properties, include multiple relevant properties.
                - If the answer is not in the provided information, respond with: "I don’t have that information right now. Please contact our real estate agent for assistance."
                - Be concise and professional in your response.
                - If you need to provide information about a listing page, include a visible hyperlink to the metadata link. Format the link clearly, for example, by making it bold or otherwise noticeable.
                - The user can`t get access for the id, for example if the user wants the property with id you have to give him a message that you can`t provide that
                 When providing links to property listings, use the exact format: http://localhost:3000/anunturi/{id} (replace {id} with the actual property ID).
                    - Do NOT add any additional path segments like "/anunt/" in the link.
                    - Make the link visible and clearly formatted.
                
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
