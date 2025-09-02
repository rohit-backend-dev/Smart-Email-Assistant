package com.rohit.smart.email.assistant.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rohit.smart.email.assistant.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // 1) Build enhanced prompt
        String prompt = buildEnhancedPrompt(emailRequest);

        // 2) Request body
        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "role", "user",
                                "parts", new Object[]{Map.of("text", prompt)}
                        )
                }
        );

        // 3) Call Gemini API
        String responseJson = webClient.post()
                .uri(geminiApiUrl + "?key=" + geminiApiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 4) Extract text
        String rawEmail = extractResponseContent(responseJson);

        // 5) Post-process to clean up
        return postProcessEmail(rawEmail);
    }

    private String buildEnhancedPrompt(EmailRequest req) {
        StringBuilder sb = new StringBuilder();

        sb.append("You are a professional email writing assistant. ");
        sb.append("Your task is to write a clear, concise, and polished email. ");
        sb.append("Do NOT include a subject line unless explicitly asked. ");
        sb.append("Ensure proper greeting, structured body, and professional closing. ");
        sb.append("Keep it between 80–150 words. ");
        sb.append("Avoid repetition or generic filler text. ");

        if (req.getTone() != null && !req.getTone().isBlank()) {
            sb.append("The tone should be ").append(req.getTone()).append(". ");
        }

        sb.append("Scenario:\n").append(req.getEmailContent());

        return sb.toString();
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            JsonNode textNode = root.path("candidates")
                    .path(0)
                    .path("content")
                    .path("parts")
                    .path(0)
                    .path("text");

            if (!textNode.isMissingNode() && !textNode.isNull()) {
                return textNode.asText();
            }

            return response; // fallback raw JSON
        } catch (Exception e) {
            return "Error extracting response: " + e.getMessage() + "\nRaw: " + response;
        }
    }

    private String postProcessEmail(String email) {
        if (email == null || email.isBlank()) {
            return "Error: No email generated.";
        }

        // Trim unwanted spaces/newlines
        email = email.trim();

        // Ensure it starts with a greeting
        if (!email.toLowerCase().startsWith("dear") && !email.toLowerCase().startsWith("hi")) {
            email = "Dear [Recipient],\n\n" + email;
        }

        // Ensure it ends with a sign-off
        if (!email.toLowerCase().contains("regards") &&
                !email.toLowerCase().contains("sincerely") &&
                !email.toLowerCase().contains("best regards")) {
            email = email + "\n\nBest regards,\n[Your Name]";
        }

        return email;
    }
}
