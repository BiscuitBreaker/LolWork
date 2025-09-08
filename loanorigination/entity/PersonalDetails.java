package com.loanorigination.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "personal_details")
public class PersonalDetails {
    
    @Id
    @Column(name = "user_id")
    private Long userId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;
    
    @Column(name = "middle_name", length = 100)
    private String middleName;
    
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;
    
    @Column(unique = true, length = 255)
    private String email;
    
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gender_id")
    private GenderLookup gender;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "marital_status_id")
    private MaritalStatusLookup maritalStatus;
    
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;
    
    @Column(name = "alternate_phone", length = 15)
    private String alternatePhone;
    
    @Column(name = "current_address", nullable = false, columnDefinition = "TEXT")
    private String currentAddress;
    
    @Column(name = "permanent_address", nullable = false, columnDefinition = "TEXT")
    private String permanentAddress;
    
    @Column(name = "aadhaar_number", unique = true, length = 12)
    private String aadhaarNumber;
    
    @Column(name = "pan_number", unique = true, length = 10)
    private String panNumber;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public PersonalDetails() {}
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getMiddleName() {
        return middleName;
    }
    
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    public GenderLookup getGender() {
        return gender;
    }
    
    public void setGender(GenderLookup gender) {
        this.gender = gender;
    }
    
    public MaritalStatusLookup getMaritalStatus() {
        return maritalStatus;
    }
    
    public void setMaritalStatus(MaritalStatusLookup maritalStatus) {
        this.maritalStatus = maritalStatus;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getAlternatePhone() {
        return alternatePhone;
    }
    
    public void setAlternatePhone(String alternatePhone) {
        this.alternatePhone = alternatePhone;
    }
    
    public String getCurrentAddress() {
        return currentAddress;
    }
    
    public void setCurrentAddress(String currentAddress) {
        this.currentAddress = currentAddress;
    }
    
    public String getPermanentAddress() {
        return permanentAddress;
    }
    
    public void setPermanentAddress(String permanentAddress) {
        this.permanentAddress = permanentAddress;
    }
    
    public String getAadhaarNumber() {
        return aadhaarNumber;
    }
    
    public void setAadhaarNumber(String aadhaarNumber) {
        this.aadhaarNumber = aadhaarNumber;
    }
    
    public String getPanNumber() {
        return panNumber;
    }
    
    public void setPanNumber(String panNumber) {
        this.panNumber = panNumber;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
