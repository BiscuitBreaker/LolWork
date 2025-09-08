package com.loanorigination.controller;

import com.loanorigination.entity.*;
import com.loanorigination.repository.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@Tag(name = "Admin", description = "Administrative APIs for data initialization")
public class AdminController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private LoanStatusLookupRepository loanStatusLookupRepository;

    @Autowired
    private GenderLookupRepository genderLookupRepository;

    @Autowired
    private MaritalStatusLookupRepository maritalStatusLookupRepository;

    @Autowired
    private OccupationLookupRepository occupationLookupRepository;

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/initialize-data")
    @Operation(summary = "Initialize lookup data", 
               description = "Initializes all lookup tables with default values for the loan origination system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Data initialized successfully"),
        @ApiResponse(responseCode = "500", description = "Failed to initialize data")
    })
    public ResponseEntity<?> initializeData() {
        try {
            initializeRoles();
            initializeLoanStatuses();
            initializeGenders();
            initializeMaritalStatuses();
            initializeOccupations();
            initializeDocumentTypes();
            initializeDefaultMembers();
            
            return ResponseEntity.ok("Data initialization completed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error initializing data: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Application is running");
    }

    private void initializeRoles() {
        try {
            if (roleRepository.count() == 0) {
                roleRepository.save(new Role("MAKER"));
                roleRepository.save(new Role("CHECKER"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing roles: " + e.getMessage());
        }
    }

    private void initializeLoanStatuses() {
        try {
            if (loanStatusLookupRepository.count() == 0) {
                loanStatusLookupRepository.save(new LoanStatusLookup("DRAFT"));
                loanStatusLookupRepository.save(new LoanStatusLookup("SUBMITTED"));
                loanStatusLookupRepository.save(new LoanStatusLookup("UNDER_REVIEW"));
                loanStatusLookupRepository.save(new LoanStatusLookup("PENDING_VERIFICATION"));
                loanStatusLookupRepository.save(new LoanStatusLookup("APPROVED"));
                loanStatusLookupRepository.save(new LoanStatusLookup("REJECTED"));
                loanStatusLookupRepository.save(new LoanStatusLookup("DISBURSED"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing loan statuses: " + e.getMessage());
        }
    }

    private void initializeGenders() {
        try {
            if (genderLookupRepository.count() == 0) {
                genderLookupRepository.save(new GenderLookup("Male"));
                genderLookupRepository.save(new GenderLookup("Female"));
                genderLookupRepository.save(new GenderLookup("Other"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing genders: " + e.getMessage());
        }
    }

    private void initializeMaritalStatuses() {
        try {
            if (maritalStatusLookupRepository.count() == 0) {
                maritalStatusLookupRepository.save(new MaritalStatusLookup("Single"));
                maritalStatusLookupRepository.save(new MaritalStatusLookup("Married"));
                maritalStatusLookupRepository.save(new MaritalStatusLookup("Divorced"));
                maritalStatusLookupRepository.save(new MaritalStatusLookup("Widowed"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing marital statuses: " + e.getMessage());
        }
    }

    private void initializeOccupations() {
        try {
            if (occupationLookupRepository.count() == 0) {
                occupationLookupRepository.save(new OccupationLookup("Salaried"));
                occupationLookupRepository.save(new OccupationLookup("Self-Employed"));
                occupationLookupRepository.save(new OccupationLookup("Business Owner"));
                occupationLookupRepository.save(new OccupationLookup("Professional"));
                occupationLookupRepository.save(new OccupationLookup("Retired"));
                occupationLookupRepository.save(new OccupationLookup("Student"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing occupations: " + e.getMessage());
        }
    }

    private void initializeDocumentTypes() {
        try {
            if (documentTypeRepository.count() == 0) {
                // Identity Documents
                documentTypeRepository.save(new DocumentType("Aadhaar Card"));
                documentTypeRepository.save(new DocumentType("PAN Card"));
                documentTypeRepository.save(new DocumentType("Passport"));
                documentTypeRepository.save(new DocumentType("Voter ID"));
                documentTypeRepository.save(new DocumentType("Driver License"));
                documentTypeRepository.save(new DocumentType("Photograph"));
                
                // Income Documents
                documentTypeRepository.save(new DocumentType("Salary Certificate"));
                documentTypeRepository.save(new DocumentType("Bank Statements"));
                documentTypeRepository.save(new DocumentType("ITR"));
                documentTypeRepository.save(new DocumentType("Form 16"));
                
                // Business Documents
                documentTypeRepository.save(new DocumentType("Business Registration"));
                documentTypeRepository.save(new DocumentType("GST Certificate"));
                documentTypeRepository.save(new DocumentType("Trade License"));
                
                // Loan Specific Documents
                documentTypeRepository.save(new DocumentType("Property Documents"));
                documentTypeRepository.save(new DocumentType("Sale Agreement"));
                documentTypeRepository.save(new DocumentType("Valuation Report"));
                documentTypeRepository.save(new DocumentType("Insurance Policy"));
            }
        } catch (Exception e) {
            System.out.println("Error initializing document types: " + e.getMessage());
        }
    }

    private void initializeDefaultMembers() {
        try {
            if (memberRepository.count() == 0) {
                Role makerRole = roleRepository.findByRoleName("MAKER").orElse(null);
                Role checkerRole = roleRepository.findByRoleName("CHECKER").orElse(null);

                if (makerRole != null) {
                    Member maker = new Member();
                    maker.setUsername("maker1");
                    maker.setPasswordHash(passwordEncoder.encode("password123"));
                    maker.setRole(makerRole);
                    memberRepository.save(maker);
                }

                if (checkerRole != null) {
                    Member checker = new Member();
                    checker.setUsername("checker1");
                    checker.setPasswordHash(passwordEncoder.encode("password123"));
                    checker.setRole(checkerRole);
                    memberRepository.save(checker);
                }
            }
        } catch (Exception e) {
            System.out.println("Error initializing default members: " + e.getMessage());
        }
    }
}
