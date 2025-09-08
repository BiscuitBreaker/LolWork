package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "marital_status_lookup")
public class MaritalStatusLookup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "status_name", unique = true)
    private String statusName;
    
    // Constructors
    public MaritalStatusLookup() {}
    
    public MaritalStatusLookup(String statusName) {
        this.statusName = statusName;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getStatusName() {
        return statusName;
    }
    
    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
}
