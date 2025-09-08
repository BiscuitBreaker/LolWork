package com.loanorigination.controller;

import com.loanorigination.dto.LoanApplicationDTO;
import com.loanorigination.service.LoanApplicationService;
import com.loanorigination.service.LoanApplicationService.ApplicationProgressDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-applications")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Loan Applications", description = "Loan application management APIs")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @GetMapping("/my-applications")
    @Operation(summary = "Get my loan applications", 
               description = "Retrieves all loan applications for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Loan applications retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<List<LoanApplicationDTO>> getMyLoanApplications(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<LoanApplicationDTO> applications = loanApplicationService.getMyLoanApplications(username);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/current")
    @Operation(summary = "Get current loan application", 
               description = "Retrieves the latest/current loan application for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Current loan application retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "404", description = "No loan application found")
    })
    public ResponseEntity<LoanApplicationDTO> getCurrentLoanApplication(Authentication authentication) {
        try {
            String username = authentication.getName();
            LoanApplicationDTO application = loanApplicationService.getCurrentLoanApplication(username);
            
            if (application == null) {
                return ResponseEntity.notFound().build();
            }
            
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{applicationId}")
    @Operation(summary = "Get loan application by ID", 
               description = "Retrieves a specific loan application by ID for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Loan application retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "404", description = "Loan application not found"),
        @ApiResponse(responseCode = "403", description = "Access denied to loan application")
    })
    public ResponseEntity<LoanApplicationDTO> getLoanApplicationById(
            @PathVariable Long applicationId, 
            Authentication authentication) {
        try {
            String username = authentication.getName();
            LoanApplicationDTO application = loanApplicationService.getLoanApplicationById(username, applicationId);
            return ResponseEntity.ok(application);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/progress")
    @Operation(summary = "Get application progress", 
               description = "Retrieves the completion progress of the user's loan application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Application progress retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = ApplicationProgressDTO.class))),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<ApplicationProgressDTO> getApplicationProgress(Authentication authentication) {
        try {
            String username = authentication.getName();
            ApplicationProgressDTO progress = loanApplicationService.getApplicationProgress(username);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/status")
    @Operation(summary = "Get loan application status", 
               description = "Retrieves the current status of the user's latest loan application")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Status retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "No loan application found")
    })
    public ResponseEntity<String> getLoanApplicationStatus(Authentication authentication) {
        try {
            String username = authentication.getName();
            LoanApplicationDTO application = loanApplicationService.getCurrentLoanApplication(username);
            
            if (application == null) {
                return ResponseEntity.ok("No Application");
            }
            
            return ResponseEntity.ok(application.getStatus());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
