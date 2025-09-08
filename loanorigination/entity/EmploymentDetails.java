package com.loanorigination.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "employment_details")
public class EmploymentDetails {
    
    @Id
    @Column(name = "user_id")
    private Long userId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "occupation_id")
    private OccupationLookup occupation;
    
    @Column(name = "employer_name", length = 255)
    private String employerName;
    
    @Column(name = "job_title", length = 255)
    private String jobTitle;
    
    @Column(name = "work_experience_years")
    private Integer workExperienceYears;
    
    @Column(name = "annual_income", precision = 15, scale = 2)
    private BigDecimal annualIncome;
    
    @Column(name = "employer_address", length = 500)
    private String employerAddress;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public EmploymentDetails() {}
    
    // Getters and Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public OccupationLookup getOccupation() {
        return occupation;
    }
    
    public void setOccupation(OccupationLookup occupation) {
        this.occupation = occupation;
    }
    
    public String getEmployerName() {
        return employerName;
    }
    
    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }
    
    public String getJobTitle() {
        return jobTitle;
    }
    
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    
    public Integer getWorkExperienceYears() {
        return workExperienceYears;
    }
    
    public void setWorkExperienceYears(Integer workExperienceYears) {
        this.workExperienceYears = workExperienceYears;
    }
    
    public BigDecimal getAnnualIncome() {
        return annualIncome;
    }
    
    public void setAnnualIncome(BigDecimal annualIncome) {
        this.annualIncome = annualIncome;
    }
    
    public String getEmployerAddress() {
        return employerAddress;
    }
    
    public void setEmployerAddress(String employerAddress) {
        this.employerAddress = employerAddress;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
