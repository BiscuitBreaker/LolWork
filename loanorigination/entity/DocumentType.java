package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "document_types")
public class DocumentType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "document_type_id")
    private Long documentTypeId;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    // Constructors
    public DocumentType() {}
    
    public DocumentType(String name) {
        this.name = name;
    }
    
    // Getters and Setters
    public Long getDocumentTypeId() {
        return documentTypeId;
    }
    
    public void setDocumentTypeId(Long documentTypeId) {
        this.documentTypeId = documentTypeId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}
