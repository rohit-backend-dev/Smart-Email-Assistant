package com.rohit.smart.email.assistant.controller;

import com.rohit.smart.email.assistant.dto.EmailRequest;
import com.rohit.smart.email.assistant.service.EmailGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailAccessController {

    private final EmailGeneratorService emailGeneratorService;

    public EmailAccessController(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    // Health check
    @GetMapping("/health")
    public String health() {
        return "Smart Email Assistant is up!";
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}

