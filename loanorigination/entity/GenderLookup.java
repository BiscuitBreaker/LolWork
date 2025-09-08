package com.loanorigination.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gender_lookup")
public class GenderLookup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "gender_name", unique = true)
    private String genderName;
    
    // Constructors
    public GenderLookup() {}
    
    public GenderLookup(String genderName) {
        this.genderName = genderName;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getGenderName() {
        return genderName;
    }
    
    public void setGenderName(String genderName) {
        this.genderName = genderName;
    }
}
