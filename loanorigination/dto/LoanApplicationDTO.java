package com.loanorigination.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class LoanApplicationDTO {
    
    private Long applicationId;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Loan Details
    private String loanType;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer tenureMonths;
    private BigDecimal monthlyEmi;
    
    // Approval Information
    private String makerComments;
    private String checkerComments;
    private LocalDateTime makerApprovedAt;
    private LocalDateTime checkerApprovedAt;
    
    // Progress Information
    private boolean hasPersonalDetails;
    private boolean hasEmploymentDetails;
    private boolean hasLoanDetails;
    private boolean hasNomineeDetails;
    private boolean hasRequiredDocuments;
    
    // Constructors
    public LoanApplicationDTO() {}
    
    public LoanApplicationDTO(Long applicationId, String status, LocalDateTime createdAt) {
        this.applicationId = applicationId;
        this.status = status;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getApplicationId() {
        return applicationId;
    }
    
    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
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
    
    public String getLoanType() {
        return loanType;
    }
    
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public BigDecimal getInterestRate() {
        return interestRate;
    }
    
    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }
    
    public Integer getTenureMonths() {
        return tenureMonths;
    }
    
    public void setTenureMonths(Integer tenureMonths) {
        this.tenureMonths = tenureMonths;
    }
    
    public BigDecimal getMonthlyEmi() {
        return monthlyEmi;
    }
    
    public void setMonthlyEmi(BigDecimal monthlyEmi) {
        this.monthlyEmi = monthlyEmi;
    }
    
    public String getMakerComments() {
        return makerComments;
    }
    
    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public LocalDateTime getMakerApprovedAt() {
        return makerApprovedAt;
    }
    
    public void setMakerApprovedAt(LocalDateTime makerApprovedAt) {
        this.makerApprovedAt = makerApprovedAt;
    }
    
    public LocalDateTime getCheckerApprovedAt() {
        return checkerApprovedAt;
    }
    
    public void setCheckerApprovedAt(LocalDateTime checkerApprovedAt) {
        this.checkerApprovedAt = checkerApprovedAt;
    }
    
    public boolean isHasPersonalDetails() {
        return hasPersonalDetails;
    }
    
    public void setHasPersonalDetails(boolean hasPersonalDetails) {
        this.hasPersonalDetails = hasPersonalDetails;
    }
    
    public boolean isHasEmploymentDetails() {
        return hasEmploymentDetails;
    }
    
    public void setHasEmploymentDetails(boolean hasEmploymentDetails) {
        this.hasEmploymentDetails = hasEmploymentDetails;
    }
    
    public boolean isHasLoanDetails() {
        return hasLoanDetails;
    }
    
    public void setHasLoanDetails(boolean hasLoanDetails) {
        this.hasLoanDetails = hasLoanDetails;
    }
    
    public boolean isHasNomineeDetails() {
        return hasNomineeDetails;
    }
    
    public void setHasNomineeDetails(boolean hasNomineeDetails) {
        this.hasNomineeDetails = hasNomineeDetails;
    }
    
    public boolean isHasRequiredDocuments() {
        return hasRequiredDocuments;
    }
    
    public void setHasRequiredDocuments(boolean hasRequiredDocuments) {
        this.hasRequiredDocuments = hasRequiredDocuments;
    }
}
