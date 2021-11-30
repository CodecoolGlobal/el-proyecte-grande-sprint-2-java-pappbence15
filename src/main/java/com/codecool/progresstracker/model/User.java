package com.codecool.progresstracker.model;


import com.codecool.progresstracker.util.PasswordHandler;

import java.util.Objects;
import java.util.UUID;

public class User {
    private final UUID id;
    private final UserType userType;
    private final String name;
    private final String userName;
    private final String password;
    private final PasswordHandler passwordHandler = new PasswordHandler();

    public User(UserType userType, String name, String userName, String password) {
        this.id = UUID.randomUUID();
        this.userType = userType;
        this.name = name;
        this.userName = userName;
        this.password = passwordHandler.encodePassword(password);
    }

    public UUID getId() {
        return id;
    }

    public UserType getUserType() {
        return userType;
    }

    public String getName() {
        return name;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public boolean doesPasswordMatch(String password){
        return Objects.equals(this.password, passwordHandler.encodePassword(password));
    }
}
