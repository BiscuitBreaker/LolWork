package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "occupation_lookup")
public class OccupationLookup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "occupation_name", unique = true)
    private String occupationName;
    
    // Constructors
    public OccupationLookup() {}
    
    public OccupationLookup(String occupationName) {
        this.occupationName = occupationName;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getOccupationName() {
        return occupationName;
    }
    
    public void setOccupationName(String occupationName) {
        this.occupationName = occupationName;
    }
}
