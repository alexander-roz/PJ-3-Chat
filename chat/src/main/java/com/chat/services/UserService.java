package com.chat.services;

import com.chat.dto.Request;
import com.chat.model.entities.UserEntity;

import java.util.List;

public interface UserService {
    Integer addUser(UserEntity user);
    Request deleteUser(UserEntity user);
    Request deleteAllUsers();
    List<UserEntity> findAllUsers();
    UserEntity getUserByID(int id);

    UserEntity findUserByName(String name);

    boolean checkTheUser(String name);

}
