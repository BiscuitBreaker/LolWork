package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "loan_status_lookup")
public class LoanStatusLookup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "status_name", unique = true, nullable = false)
    private String statusName;
    
    // Constructors
    public LoanStatusLookup() {}
    
    public LoanStatusLookup(String statusName) {
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
