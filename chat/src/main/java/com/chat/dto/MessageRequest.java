package com.chat.dto;

import lombok.Data;

@Data
public class MessageRequest {
    String text;
    String user;
}
