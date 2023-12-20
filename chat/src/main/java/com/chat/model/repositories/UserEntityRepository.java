package com.chat.model.repositories;

import com.chat.model.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntityRepository extends JpaRepository<UserEntity, Integer> {
    UserEntity findUserEntityById(int id);
    UserEntity findUserEntityByName(String name);
    boolean existsByName(String name);
}
