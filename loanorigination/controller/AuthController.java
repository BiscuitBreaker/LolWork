package com.loanorigination.controller;

import com.loanorigination.dto.LoginRequest;
import com.loanorigination.dto.LoginResponse;
import com.loanorigination.dto.RegisterRequest;
import com.loanorigination.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "Authentication", description = "Authentication APIs for customers and bank members")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/customer/register")
    @Operation(summary = "Register new customer", 
               description = "Creates a new customer account in the loan origination system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Customer registered successfully",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoginResponse.class))),
        @ApiResponse(responseCode = "400", description = "Registration failed - validation errors or duplicate username")
    })
    public ResponseEntity<?> registerCustomer(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            LoginResponse response = authService.registerCustomer(registerRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/customer/login")
    @Operation(summary = "Customer login", 
               description = "Authenticates a customer and returns JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoginResponse.class))),
        @ApiResponse(responseCode = "400", description = "Login failed - invalid credentials")
    })
    public ResponseEntity<?> loginCustomer(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.loginCustomer(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/member/login")
    @Operation(summary = "Member login", 
               description = "Authenticates a bank member (maker/checker) and returns JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful",
                    content = @Content(mediaType = "application/json", 
                                     schema = @Schema(implementation = LoginResponse.class))),
        @ApiResponse(responseCode = "400", description = "Login failed - invalid credentials")
    })
    public ResponseEntity<?> loginMember(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.loginMember(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
}
