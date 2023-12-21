package com.chat.services;

import com.chat.dto.Request;
import com.chat.model.entities.MessageEntity;

import java.util.List;

public interface MessageService {
    Integer addMessage(MessageEntity message);
    Request deleteMessage(MessageEntity message);
    Request deleteAllMessages();
    List<MessageEntity> findAllMessages();
    MessageEntity getMessageByID(int id);
    List<String> findMessagesByUser(String user);
}
