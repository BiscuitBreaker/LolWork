package com.loanorigination.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "loan_applications")
public class LoanApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Long applicationId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id", nullable = false)
    private LoanStatusLookup status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToOne(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private LoanDetails loanDetails;
    
    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<NomineeDetails> nomineeDetails;
    
    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<LoanDocument> loanDocuments;
    
    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ApplicationStatusHistory> statusHistory;
    
    @OneToMany(mappedBy = "loanApplication", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<InternalNote> internalNotes;
    
    // Constructors
    public LoanApplication() {}
    
    public LoanApplication(User user, LoanStatusLookup status) {
        this.user = user;
        this.status = status;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getApplicationId() {
        return applicationId;
    }
    
    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public LoanStatusLookup getStatus() {
        return status;
    }
    
    public void setStatus(LoanStatusLookup status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public LoanDetails getLoanDetails() {
        return loanDetails;
    }
    
    public void setLoanDetails(LoanDetails loanDetails) {
        this.loanDetails = loanDetails;
    }
    
    public List<NomineeDetails> getNomineeDetails() {
        return nomineeDetails;
    }
    
    public void setNomineeDetails(List<NomineeDetails> nomineeDetails) {
        this.nomineeDetails = nomineeDetails;
    }
    
    public List<LoanDocument> getLoanDocuments() {
        return loanDocuments;
    }
    
    public void setLoanDocuments(List<LoanDocument> loanDocuments) {
        this.loanDocuments = loanDocuments;
    }
    
    public List<ApplicationStatusHistory> getStatusHistory() {
        return statusHistory;
    }
    
    public void setStatusHistory(List<ApplicationStatusHistory> statusHistory) {
        this.statusHistory = statusHistory;
    }
    
    public List<InternalNote> getInternalNotes() {
        return internalNotes;
    }
    
    public void setInternalNotes(List<InternalNote> internalNotes) {
        this.internalNotes = internalNotes;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
