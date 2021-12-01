package com.codecool.progresstracker.dao;

import com.codecool.progresstracker.model.User;

import java.util.List;
import java.util.UUID;

public interface UserDao {
    void add(User user);
    List<User> getAllUsers();
    User getById(UUID id);
}
