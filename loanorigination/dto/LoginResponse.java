package com.loanorigination.dto;

public class LoginResponse {
    
    private String token;
    private String userType;
    private String username;
    private Boolean isNewUser;
    
    // Constructors
    public LoginResponse() {}
    
    public LoginResponse(String token, String userType, String username, Boolean isNewUser) {
        this.token = token;
        this.userType = userType;
        this.username = username;
        this.isNewUser = isNewUser;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getUserType() {
        return userType;
    }
    
    public void setUserType(String userType) {
        this.userType = userType;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public Boolean getIsNewUser() {
        return isNewUser;
    }
    
    public void setIsNewUser(Boolean isNewUser) {
        this.isNewUser = isNewUser;
    }
}
