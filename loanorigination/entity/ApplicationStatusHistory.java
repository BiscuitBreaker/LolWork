package com.loanorigination.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "application_status_history")
public class ApplicationStatusHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Integer historyId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private LoanApplication loanApplication;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "status_id")
    private LoanStatusLookup status;
    
    @Column(name = "changed_at", nullable = false)
    private LocalDateTime changedAt;
    
    // Constructors
    public ApplicationStatusHistory() {}
    
    public ApplicationStatusHistory(LoanApplication loanApplication, Member member, 
                                   LoanStatusLookup status, LocalDateTime changedAt) {
        this.loanApplication = loanApplication;
        this.member = member;
        this.status = status;
        this.changedAt = changedAt;
    }
    
    // Getters and Setters
    public Integer getHistoryId() {
        return historyId;
    }
    
    public void setHistoryId(Integer historyId) {
        this.historyId = historyId;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }
    
    public Member getMember() {
        return member;
    }
    
    public void setMember(Member member) {
        this.member = member;
    }
    
    public LoanStatusLookup getStatus() {
        return status;
    }
    
    public void setStatus(LoanStatusLookup status) {
        this.status = status;
    }
    
    public LocalDateTime getChangedAt() {
        return changedAt;
    }
    
    public void setChangedAt(LocalDateTime changedAt) {
        this.changedAt = changedAt;
    }
}
