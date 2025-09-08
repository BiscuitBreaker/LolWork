package com.loanorigination.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class PersonalDetailsDTO {
    
    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    private String firstName;
    
    @Size(max = 100, message = "Middle name cannot exceed 100 characters")
    private String middleName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    private String lastName;
    
    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;
    
    @NotNull(message = "Gender is required")
    private Long genderId;
    
    @NotNull(message = "Marital status is required")
    private Long maritalStatusId;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9-\\s()]+$", message = "Invalid phone number format")
    private String phoneNumber;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Aadhaar number is required")
    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhaar number must be 12 digits")
    private String aadhaarNumber;
    
    @NotBlank(message = "PAN number is required")
    @Pattern(regexp = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", message = "Invalid PAN number format")
    private String panNumber;
    
    @NotBlank(message = "Current address is required")
    private String currentAddress;
    
    @NotBlank(message = "Permanent address is required")
    private String permanentAddress;
    
    // Constructors
    public PersonalDetailsDTO() {}
    
    // Getters and Setters
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
    
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    public Long getGenderId() {
        return genderId;
    }
    
    public void setGenderId(Long genderId) {
        this.genderId = genderId;
    }
    
    public Long getMaritalStatusId() {
        return maritalStatusId;
    }
    
    public void setMaritalStatusId(Long maritalStatusId) {
        this.maritalStatusId = maritalStatusId;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
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
}
