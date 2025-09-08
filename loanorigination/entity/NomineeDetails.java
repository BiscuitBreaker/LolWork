package com.loanorigination.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "nominee_details")
public class NomineeDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nominee_id")
    private Long nomineeId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private LoanApplication loanApplication;
    
    @Column(name = "nominee_name", nullable = false, length = 255)
    private String nomineeName;
    
    @Column(name = "relationship", nullable = false, length = 100)
    private String relationship;
    
    @Column(name = "nominee_dob")
    private LocalDate nomineeDob;
    
    @Column(name = "nominee_address", length = 500)
    private String nomineeAddress;
    
    @Column(name = "nominee_phone", length = 15)
    private String nomineePhone;
    
    @Column(name = "nominee_email", length = 255)
    private String nomineeEmail;
    
    @Column(name = "nominee_aadhaar", length = 12)
    private String nomineeAadhaar;
    
    @Column(name = "nominee_pan", length = 10)
    private String nomineePan;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public NomineeDetails() {}
    
    public NomineeDetails(LoanApplication loanApplication, String nomineeName, String relationship) {
        this.loanApplication = loanApplication;
        this.nomineeName = nomineeName;
        this.relationship = relationship;
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getNomineeId() {
        return nomineeId;
    }
    
    public void setNomineeId(Long nomineeId) {
        this.nomineeId = nomineeId;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }
    
    public String getNomineeName() {
        return nomineeName;
    }
    
    public void setNomineeName(String nomineeName) {
        this.nomineeName = nomineeName;
    }
    
    public String getRelationship() {
        return relationship;
    }
    
    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
    
    public LocalDate getNomineeDob() {
        return nomineeDob;
    }
    
    public void setNomineeDob(LocalDate nomineeDob) {
        this.nomineeDob = nomineeDob;
    }
    
    public String getNomineeAddress() {
        return nomineeAddress;
    }
    
    public void setNomineeAddress(String nomineeAddress) {
        this.nomineeAddress = nomineeAddress;
    }
    
    public String getNomineePhone() {
        return nomineePhone;
    }
    
    public void setNomineePhone(String nomineePhone) {
        this.nomineePhone = nomineePhone;
    }
    
    public String getNomineeEmail() {
        return nomineeEmail;
    }
    
    public void setNomineeEmail(String nomineeEmail) {
        this.nomineeEmail = nomineeEmail;
    }
    
    public String getNomineeAadhaar() {
        return nomineeAadhaar;
    }
    
    public void setNomineeAadhaar(String nomineeAadhaar) {
        this.nomineeAadhaar = nomineeAadhaar;
    }
    
    public String getNomineePan() {
        return nomineePan;
    }
    
    public void setNomineePan(String nomineePan) {
        this.nomineePan = nomineePan;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
