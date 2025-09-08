package com.loanorigination.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.loanorigination.entity.PersonalDetails;
import com.loanorigination.service.PersonalDetailsService;
import com.loanorigination.dto.PersonalDetailsDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/personal-details")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Personal Details", description = "Personal details management APIs")
public class PersonalDetailsController {
    
    @Autowired
    private PersonalDetailsService personalDetailsService;

    @GetMapping("/me")
    @Operation(summary = "Get my personal details", description = "Retrieves personal details for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personal details retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Personal details not found")
    })
    public ResponseEntity<PersonalDetails> getMyPersonalDetails(Authentication authentication) {
        try {
            String username;
            if (authentication != null) {
                username = authentication.getName();
            } else {
                // For testing purposes, use a default user
                username = "vinay";
            }
            PersonalDetails details = personalDetailsService.getPersonalDetailsByUsername(username);
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/me")
    @Operation(summary = "Create personal details", description = "Creates personal details for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personal details created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input or personal details already exist")
    })
    public ResponseEntity<?> createPersonalDetails(@Valid @RequestBody PersonalDetailsDTO personalDetailsDTO, 
                                                   Authentication authentication) {
        try {
            String username;
            if (authentication != null) {
                username = authentication.getName();
            } else {
                // For testing purposes, use a default user
                username = "vinay";
            }
            PersonalDetails created = personalDetailsService.createPersonalDetails(username, personalDetailsDTO);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create personal details: " + e.getMessage());
        }
    }

    @PutMapping("/me")
    @Operation(summary = "Update personal details", description = "Updates personal details for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Personal details updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input"),
        @ApiResponse(responseCode = "404", description = "Personal details not found")
    })
    public ResponseEntity<?> updatePersonalDetails(@Valid @RequestBody PersonalDetailsDTO personalDetailsDTO, 
                                                   Authentication authentication) {
        try {
            String username;
            if (authentication != null) {
                username = authentication.getName();
            } else {
                // For testing purposes, use a default user
                username = "vinay";
            }
            PersonalDetails updated = personalDetailsService.updatePersonalDetails(username, personalDetailsDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update personal details: " + e.getMessage());
        }
    }
}
