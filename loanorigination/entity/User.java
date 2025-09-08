package com.loanorigination.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long customerId;
    
    @Column(unique = true, nullable = false)
    private String username;
    
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    
    @Column(name = "is_new_user")
    private Boolean isNewUser = true;
    
    @Column(name = "activation_at")
    private LocalDateTime activationAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private PersonalDetails personalDetails;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private EmploymentDetails employmentDetails;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanApplication> loanApplications;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<UserDocument> userDocuments;
    
    // Constructors
    public User() {}
    
    public User(String username, String passwordHash) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.isNewUser = true;
        this.activationAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public Boolean getIsNewUser() {
        return isNewUser;
    }
    
    public void setIsNewUser(Boolean isNewUser) {
        this.isNewUser = isNewUser;
    }
    
    public LocalDateTime getActivationAt() {
        return activationAt;
    }
    
    public void setActivationAt(LocalDateTime activationAt) {
        this.activationAt = activationAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public PersonalDetails getPersonalDetails() {
        return personalDetails;
    }
    
    public void setPersonalDetails(PersonalDetails personalDetails) {
        this.personalDetails = personalDetails;
    }
    
    public EmploymentDetails getEmploymentDetails() {
        return employmentDetails;
    }
    
    public void setEmploymentDetails(EmploymentDetails employmentDetails) {
        this.employmentDetails = employmentDetails;
    }
    
    public List<LoanApplication> getLoanApplications() {
        return loanApplications;
    }
    
    public void setLoanApplications(List<LoanApplication> loanApplications) {
        this.loanApplications = loanApplications;
    }
    
    public List<UserDocument> getUserDocuments() {
        return userDocuments;
    }
    
    public void setUserDocuments(List<UserDocument> userDocuments) {
        this.userDocuments = userDocuments;
    }
}
