package com.loanorigination.service;

import com.loanorigination.dto.LoanApplicationDTO;
import com.loanorigination.dto.WorkflowActionRequest;
import com.loanorigination.entity.LoanApplication;
import com.loanorigination.entity.Member;
import com.loanorigination.entity.LoanStatusLookup;
import com.loanorigination.entity.InternalNote;
import com.loanorigination.repository.LoanApplicationRepository;
import com.loanorigination.repository.MemberRepository;
import com.loanorigination.repository.LoanStatusLookupRepository;
import com.loanorigination.repository.InternalNoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WorkflowService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    private LoanStatusLookupRepository loanStatusLookupRepository;
    
    @Autowired
    private InternalNoteRepository internalNoteRepository;

    public List<LoanApplicationDTO> getMakerPendingApplications(String username) {
        // Verify user is a maker
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        if (!"MAKER".equals(member.getRole().getRoleName())) {
            throw new RuntimeException("Access denied - not a maker");
        }
        
        // Get applications that need maker review
        List<LoanApplication> applications = loanApplicationRepository
            .findByStatusNameIn(List.of("SUBMITTED", "RETURNED_TO_MAKER"));
            
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<LoanApplicationDTO> getCheckerPendingApplications(String username) {
        // Verify user is a checker
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        if (!"CHECKER".equals(member.getRole().getRoleName())) {
            throw new RuntimeException("Access denied - not a checker");
        }
        
        // Get applications that passed maker review
        List<LoanApplication> applications = loanApplicationRepository
            .findByStatusName("PENDING_CHECKER_APPROVAL");
            
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public void processMakerAction(Long applicationId, WorkflowActionRequest actionRequest, String username) {
        // Verify user is a maker
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        if (!"MAKER".equals(member.getRole().getRoleName())) {
            throw new RuntimeException("Access denied - not a maker");
        }
        
        LoanApplication application = loanApplicationRepository.findById(applicationId.intValue())
            .orElseThrow(() -> new RuntimeException("Application not found"));
            
        LoanStatusLookup newStatus;
        switch (actionRequest.getAction().toUpperCase()) {
            case "APPROVE":
                newStatus = loanStatusLookupRepository.findByStatusName("MAKER_APPROVED")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            case "REJECT":
                newStatus = loanStatusLookupRepository.findByStatusName("MAKER_REJECTED")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            case "RETURN":
                newStatus = loanStatusLookupRepository.findByStatusName("RETURNED_TO_CUSTOMER")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            default:
                throw new RuntimeException("Invalid action: " + actionRequest.getAction());
        }
        
        application.setStatus(newStatus);
        application.setUpdatedAt(LocalDateTime.now());
        loanApplicationRepository.save(application);
        
        // Add internal note if comments provided
        if (actionRequest.getComments() != null && !actionRequest.getComments().trim().isEmpty()) {
            InternalNote note = new InternalNote(application, member, 
                "MAKER " + actionRequest.getAction() + ": " + actionRequest.getComments(), 
                LocalDateTime.now());
            internalNoteRepository.save(note);
        }
    }

    public void processCheckerAction(Long applicationId, WorkflowActionRequest actionRequest, String username) {
        // Verify user is a checker
        Member member = memberRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        if (!"CHECKER".equals(member.getRole().getRoleName())) {
            throw new RuntimeException("Access denied - not a checker");
        }
        
        LoanApplication application = loanApplicationRepository.findById(applicationId.intValue())
            .orElseThrow(() -> new RuntimeException("Application not found"));
            
        LoanStatusLookup newStatus;
        switch (actionRequest.getAction().toUpperCase()) {
            case "APPROVE":
                newStatus = loanStatusLookupRepository.findByStatusName("CHECKER_APPROVED")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            case "REJECT":
                newStatus = loanStatusLookupRepository.findByStatusName("CHECKER_REJECTED")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            case "RETURN":
                newStatus = loanStatusLookupRepository.findByStatusName("RETURNED_TO_MAKER")
                    .orElseThrow(() -> new RuntimeException("Status not found"));
                break;
            default:
                throw new RuntimeException("Invalid action: " + actionRequest.getAction());
        }
        
        application.setStatus(newStatus);
        application.setUpdatedAt(LocalDateTime.now());
        loanApplicationRepository.save(application);
        
        // Add internal note if comments provided
        if (actionRequest.getComments() != null && !actionRequest.getComments().trim().isEmpty()) {
            InternalNote note = new InternalNote(application, member, 
                "CHECKER " + actionRequest.getAction() + ": " + actionRequest.getComments(), 
                LocalDateTime.now());
            internalNoteRepository.save(note);
        }
    }

    public LoanApplicationDTO getApplicationDetailsForWorkflow(Long applicationId, String username) {
        // Verify user is a member (but don't need to store the result)
        memberRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("Member not found"));
        
        LoanApplication application = loanApplicationRepository.findById(applicationId.intValue())
            .orElseThrow(() -> new RuntimeException("Application not found"));
            
        return convertToDTO(application);
    }

    private LoanApplicationDTO convertToDTO(LoanApplication application) {
        LoanApplicationDTO dto = new LoanApplicationDTO();
        dto.setApplicationId(application.getApplicationId());
        dto.setStatus(application.getStatus().getStatusName());
        dto.setCreatedAt(application.getCreatedAt());
        dto.setUpdatedAt(application.getUpdatedAt());
        
        // Set loan details if available
        if (application.getLoanDetails() != null) {
            dto.setAmount(application.getLoanDetails().getAmount());
            dto.setLoanType(application.getLoanDetails().getLoanType());
            dto.setInterestRate(application.getLoanDetails().getInterestRate());
            dto.setTenureMonths(application.getLoanDetails().getTenureMonths());
            dto.setMonthlyEmi(application.getLoanDetails().getMonthlyEmi());
            dto.setMakerComments(application.getLoanDetails().getMakerComments());
            dto.setCheckerComments(application.getLoanDetails().getCheckerComments());
        }
        
        return dto;
    }
}
