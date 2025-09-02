package com.rohit.smart.email.assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {
    // Example: "Write an email to HR requesting 2 days of sick leave"
    private String emailContent;

    // Example: "Formal", "Friendly", "Professional", "Persuasive"
    private String tone;
}
