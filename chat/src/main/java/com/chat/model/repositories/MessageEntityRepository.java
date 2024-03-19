package com.chat.model.repositories;

import com.chat.model.entities.MessageEntity;
import com.chat.model.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageEntityRepository extends JpaRepository<MessageEntity, Integer> {
    List<MessageEntity> findMessageEntitiesByUser_Name (String name);
    MessageEntity findMessageEntitiesByMessageID(int id);

    List<MessageEntity> getMessageEntitiesByUser(UserEntity user);
}
