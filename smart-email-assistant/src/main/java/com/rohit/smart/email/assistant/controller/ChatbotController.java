package com.rohit.smart.email.assistant.controller;

import com.rohit.smart.email.assistant.dto.ChatRequest;
import com.rohit.smart.email.assistant.dto.ChatResponse;
import com.rohit.smart.email.assistant.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String message = request.getMessage();
        if (message == null || message.isEmpty()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }
        String reply = chatbotService.getChatResponse(message);
        return new ChatResponse(reply);
    }

}
