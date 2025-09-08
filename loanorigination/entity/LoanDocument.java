package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_documents")
public class LoanDocument {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loan_document_id")
    private Long loanDocumentId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private LoanApplication loanApplication;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "document_type_id", nullable = false)
    private DocumentType documentType;
    
    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;
    
    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified = false;
    
    // Constructors
    public LoanDocument() {}
    
    public LoanDocument(LoanApplication loanApplication, DocumentType documentType, String filePath) {
        this.loanApplication = loanApplication;
        this.documentType = documentType;
        this.filePath = filePath;
        this.isVerified = false;
    }
    
    // Getters and Setters
    public Long getLoanDocumentId() {
        return loanDocumentId;
    }
    
    public void setLoanDocumentId(Long loanDocumentId) {
        this.loanDocumentId = loanDocumentId;
    }
    
    public LoanApplication getLoanApplication() {
        return loanApplication;
    }
    
    public void setLoanApplication(LoanApplication loanApplication) {
        this.loanApplication = loanApplication;
    }
    
    public DocumentType getDocumentType() {
        return documentType;
    }
    
    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }
    
    public String getFilePath() {
        return filePath;
    }
    
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    
    public Boolean getIsVerified() {
        return isVerified;
    }
    
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }
}
