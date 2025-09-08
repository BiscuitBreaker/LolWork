package com.loanorigination.controller;

import com.loanorigination.dto.LoanApplicationDTO;
import com.loanorigination.dto.WorkflowActionRequest;
import com.loanorigination.service.WorkflowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workflow")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Workflow", description = "Maker-Checker workflow APIs")
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    @GetMapping("/maker/pending")
    @Operation(summary = "Get pending applications for maker", 
               description = "Retrieves all loan applications pending maker review")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pending applications retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "403", description = "Access denied - not a maker")
    })
    public ResponseEntity<List<LoanApplicationDTO>> getMakerPendingApplications(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<LoanApplicationDTO> applications = workflowService.getMakerPendingApplications(username);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/checker/pending")
    @Operation(summary = "Get pending applications for checker", 
               description = "Retrieves all loan applications pending checker verification")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Pending applications retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "403", description = "Access denied - not a checker")
    })
    public ResponseEntity<List<LoanApplicationDTO>> getCheckerPendingApplications(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<LoanApplicationDTO> applications = workflowService.getCheckerPendingApplications(username);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/maker/process/{applicationId}")
    @Operation(summary = "Process application as maker", 
               description = "Approve, reject, or return application for edits as a maker")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Application processed successfully"),
        @ApiResponse(responseCode = "403", description = "Access denied - not a maker"),
        @ApiResponse(responseCode = "404", description = "Application not found")
    })
    public ResponseEntity<?> processMakerAction(
            @PathVariable Long applicationId,
            @Valid @RequestBody WorkflowActionRequest actionRequest,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            workflowService.processMakerAction(applicationId, actionRequest, username);
            return ResponseEntity.ok("Application processed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to process application: " + e.getMessage());
        }
    }

    @PostMapping("/checker/process/{applicationId}")
    @Operation(summary = "Process application as checker", 
               description = "Approve, reject, or return application to maker as a checker")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Application processed successfully"),
        @ApiResponse(responseCode = "403", description = "Access denied - not a checker"),
        @ApiResponse(responseCode = "404", description = "Application not found")
    })
    public ResponseEntity<?> processCheckerAction(
            @PathVariable Long applicationId,
            @Valid @RequestBody WorkflowActionRequest actionRequest,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            workflowService.processCheckerAction(applicationId, actionRequest, username);
            return ResponseEntity.ok("Application processed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to process application: " + e.getMessage());
        }
    }

    @GetMapping("/application/{applicationId}/details")
    @Operation(summary = "Get application details for workflow", 
               description = "Retrieves detailed application information for maker/checker review")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Application details retrieved successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoanApplicationDTO.class))),
        @ApiResponse(responseCode = "404", description = "Application not found")
    })
    public ResponseEntity<LoanApplicationDTO> getApplicationDetails(
            @PathVariable Long applicationId,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            LoanApplicationDTO application = workflowService.getApplicationDetailsForWorkflow(applicationId, username);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
