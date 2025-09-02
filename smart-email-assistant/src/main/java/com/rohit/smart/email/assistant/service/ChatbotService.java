package com.rohit.smart.email.assistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class ChatbotService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public ChatbotService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String getChatResponse(String message) {
        try {
            // Make the prompt short and focused
            String prompt = "You are an expert assistant for the Smart Email Assistant app. " +
                    "Answer user questions briefly (max 2 sentences). " +
                    "If the question is not relevant, reply: 'I can only answer questions about Smart Email Assistant.' " +
                    "User question: " + message;

            // Gemini request JSON structure
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[]{
                            Map.of(
                                    "role", "user",
                                    "parts", new Object[]{Map.of("text", prompt)}
                            )
                    }
            );

            String responseJson = webClient.post()
                    .uri(geminiApiUrl + "?key=" + geminiApiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // Parse response
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseJson);

            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                JsonNode contentParts = candidates.get(0).path("content").path("parts");
                if (contentParts.isArray() && contentParts.size() > 0) {
                    String answer = contentParts.get(0).path("text").asText();
                    // Optionally: Truncate if still too long
                    if (answer.length() > 200) {
                        answer = answer.substring(0, 200) + "...";
                    }
                    return answer;
                }
            }
            return "No response from Gemini AI.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: Could not fetch response from Gemini API.";
        }
    }
}