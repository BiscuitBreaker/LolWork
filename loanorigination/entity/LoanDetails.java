package com.loanorigination.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_details")
public class LoanDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_details_id")
    private Long loanDetailsId;
    
    @OneToOne
    @JoinColumn(name = "application_id")
    @JsonIgnore
    private LoanApplication loanApplication;
    
    @Column(name = "loan_type", nullable = false, length = 100)
    private String loanType;
    
    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "interest_rate", precision = 5, scale = 2)
    private BigDecimal interestRate;
    
    @Column(name = "tenure_months")
    private Integer tenureMonths;
    
    @Column(name = "monthly_emi", precision = 15, scale = 2)
    private BigDecimal monthlyEmi;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "maker_id")
    private Member maker;
    
    @Column(name = "maker_approved_at")
    private LocalDateTime makerApprovedAt;
    
    @Column(name = "maker_comments", columnDefinition = "TEXT")
    private String makerComments;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checker_id")
    private Member checker;
    
    @Column(name = "checker_approved_at")
    private LocalDateTime checkerApprovedAt;
    
    @Column(name = "checker_comments", columnDefinition = "TEXT")
    private String checkerComments;
    
    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public LoanDetails() {}
    
    public LoanDetails(LoanApplication loanApplication, String loanType, BigDecimal amount) {
        this.loanApplication = loanApplication;
        this.loanType = loanType;
        this.amount = amount;
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getLoanDetailsId() {
        return loanDetailsId;
    }
    
    public void setLoanDetailsId(Long loanDetailsId) {
        this.loanDetailsId = loanDetailsId;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
        // Remove automatic ID setting - let DataInitializationService handle it explicitly
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
    
    public Member getMaker() {
        return maker;
    }
    
    public void setMaker(Member maker) {
        this.maker = maker;
    }
    
    public LocalDateTime getMakerApprovedAt() {
        return makerApprovedAt;
    }
    
    public void setMakerApprovedAt(LocalDateTime makerApprovedAt) {
        this.makerApprovedAt = makerApprovedAt;
    }
    
    public String getMakerComments() {
        return makerComments;
    }
    
    public void setMakerComments(String makerComments) {
        this.makerComments = makerComments;
    }
    
    public Member getChecker() {
        return checker;
    }
    
    public void setChecker(Member checker) {
        this.checker = checker;
    }
    
    public LocalDateTime getCheckerApprovedAt() {
        return checkerApprovedAt;
    }
    
    public void setCheckerApprovedAt(LocalDateTime checkerApprovedAt) {
        this.checkerApprovedAt = checkerApprovedAt;
    }
    
    public String getCheckerComments() {
        return checkerComments;
    }
    
    public void setCheckerComments(String checkerComments) {
        this.checkerComments = checkerComments;
    }
    
    public String getRejectionReason() {
        return rejectionReason;
    }
    
    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
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
