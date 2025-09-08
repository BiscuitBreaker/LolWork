package com.loanorigination.service;

import com.loanorigination.dto.LoanApplicationDTO;
import com.loanorigination.entity.*;
import com.loanorigination.repository.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;
    
    @Autowired
    private EmploymentDetailsRepository employmentDetailsRepository;
    
    @Autowired
    private LoanDetailsRepository loanDetailsRepository;
    
    @Autowired
    private NomineeDetailsRepository nomineeDetailsRepository;
    
    @Autowired
    private LoanDocumentRepository loanDocumentRepository;

    /**
     * Get all loan applications for a user by username
     */
    public List<LoanApplicationDTO> getMyLoanApplications(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        List<LoanApplication> applications = loanApplicationRepository.findByUserCustomerId(user.getCustomerId().intValue());
        
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get the latest/current loan application for a user
     */
    public LoanApplicationDTO getCurrentLoanApplication(String username) {
        List<LoanApplicationDTO> applications = getMyLoanApplications(username);
        
        if (applications.isEmpty()) {
            return null;
        }
        
        // Return the most recent application
        return applications.stream()
                .reduce((first, second) -> second) // Get the last one
                .orElse(null);
    }

    /**
     * Get loan application by ID for the authenticated user
     */
    public LoanApplicationDTO getLoanApplicationById(String username, Long applicationId) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        LoanApplication application = loanApplicationRepository.findById(applicationId.intValue())
            .orElseThrow(() -> new EntityNotFoundException("Loan application not found: " + applicationId));
        
        // Verify the application belongs to the user
        if (!application.getUser().getCustomerId().equals(user.getCustomerId())) {
            throw new SecurityException("Access denied to loan application: " + applicationId);
        }
        
        return convertToDTO(application);
    }

    /**
     * Convert LoanApplication entity to DTO
     */
    private LoanApplicationDTO convertToDTO(LoanApplication application) {
        LoanApplicationDTO dto = new LoanApplicationDTO();
        
        dto.setApplicationId(application.getApplicationId());
        dto.setStatus(application.getStatus().getStatusName());
        dto.setCreatedAt(application.getCreatedAt());
        dto.setUpdatedAt(application.getUpdatedAt());
        
        // Set loan details if available
        if (application.getLoanDetails() != null) {
            LoanDetails details = application.getLoanDetails();
            dto.setLoanType(details.getLoanType());
            dto.setAmount(details.getAmount());
            dto.setInterestRate(details.getInterestRate());
            dto.setTenureMonths(details.getTenureMonths());
            dto.setMonthlyEmi(details.getMonthlyEmi());
            dto.setMakerComments(details.getMakerComments());
            dto.setCheckerComments(details.getCheckerComments());
            dto.setMakerApprovedAt(details.getMakerApprovedAt());
            dto.setCheckerApprovedAt(details.getCheckerApprovedAt());
        }
        
        // Check completion status
        Long userId = application.getUser().getCustomerId();
        dto.setHasPersonalDetails(personalDetailsRepository.findByUserId(userId).isPresent());
        dto.setHasEmploymentDetails(employmentDetailsRepository.findByUserId(userId).isPresent());
        dto.setHasLoanDetails(application.getLoanDetails() != null);
        dto.setHasNomineeDetails(!application.getNomineeDetails().isEmpty());
        dto.setHasRequiredDocuments(!application.getLoanDocuments().isEmpty());
        
        return dto;
    }

    /**
     * Get application progress summary
     */
    public ApplicationProgressDTO getApplicationProgress(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        ApplicationProgressDTO progress = new ApplicationProgressDTO();
        Long userId = user.getCustomerId();
        
        progress.setHasPersonalDetails(personalDetailsRepository.findByUserId(userId).isPresent());
        progress.setHasEmploymentDetails(employmentDetailsRepository.findByUserId(userId).isPresent());
        
        // Check if user has any loan application
        List<LoanApplication> applications = loanApplicationRepository.findByUserCustomerId(userId.intValue());
        if (!applications.isEmpty()) {
            LoanApplication currentApp = applications.get(applications.size() - 1); // Get latest
            progress.setHasLoanDetails(currentApp.getLoanDetails() != null);
            progress.setHasNomineeDetails(!currentApp.getNomineeDetails().isEmpty());
            progress.setHasRequiredDocuments(!currentApp.getLoanDocuments().isEmpty());
            progress.setCurrentStatus(currentApp.getStatus().getStatusName());
            progress.setApplicationId(currentApp.getApplicationId());
        }
        
        return progress;
    }

    // Inner class for application progress
    public static class ApplicationProgressDTO {
        private boolean hasPersonalDetails;
        private boolean hasEmploymentDetails;
        private boolean hasLoanDetails;
        private boolean hasNomineeDetails;
        private boolean hasRequiredDocuments;
        private String currentStatus;
        private Long applicationId;
        
        // Getters and setters
        public boolean isHasPersonalDetails() { return hasPersonalDetails; }
        public void setHasPersonalDetails(boolean hasPersonalDetails) { this.hasPersonalDetails = hasPersonalDetails; }
        
        public boolean isHasEmploymentDetails() { return hasEmploymentDetails; }
        public void setHasEmploymentDetails(boolean hasEmploymentDetails) { this.hasEmploymentDetails = hasEmploymentDetails; }
        
        public boolean isHasLoanDetails() { return hasLoanDetails; }
        public void setHasLoanDetails(boolean hasLoanDetails) { this.hasLoanDetails = hasLoanDetails; }
        
        public boolean isHasNomineeDetails() { return hasNomineeDetails; }
        public void setHasNomineeDetails(boolean hasNomineeDetails) { this.hasNomineeDetails = hasNomineeDetails; }
        
        public boolean isHasRequiredDocuments() { return hasRequiredDocuments; }
        public void setHasRequiredDocuments(boolean hasRequiredDocuments) { this.hasRequiredDocuments = hasRequiredDocuments; }
        
        public String getCurrentStatus() { return currentStatus; }
        public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }
        
        public Long getApplicationId() { return applicationId; }
        public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    }
}
