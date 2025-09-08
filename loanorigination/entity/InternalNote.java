package com.loanorigination.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "internal_notes")
public class InternalNote {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long noteId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private LoanApplication loanApplication;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;
    
    @Column(name = "note", nullable = false, columnDefinition = "TEXT")
    private String note;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public InternalNote() {}
    
    public InternalNote(LoanApplication loanApplication, Member member, String note, LocalDateTime createdAt) {
        this.loanApplication = loanApplication;
        this.member = member;
        this.note = note;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getNoteId() {
        return noteId;
    }
    
    public void setNoteId(Long noteId) {
        this.noteId = noteId;
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
    
    public String getNote() {
        return note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
