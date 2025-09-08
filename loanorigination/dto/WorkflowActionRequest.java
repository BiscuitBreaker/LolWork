package com.loanorigination.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class WorkflowActionRequest {
    
    @NotBlank(message = "Action is required")
    private String action; // "APPROVE", "REJECT", "RETURN"
    
    private String comments;
    
    // Constructors
    public WorkflowActionRequest() {}
    
    public WorkflowActionRequest(String action, String comments) {
        this.action = action;
        this.comments = comments;
    }
    
    // Getters and Setters
    public String getAction() {
        return action;
    }
    
    public void setAction(String action) {
        this.action = action;
    }
    
    public String getComments() {
        return comments;
    }
    
    public void setComments(String comments) {
        this.comments = comments;
    }
}
