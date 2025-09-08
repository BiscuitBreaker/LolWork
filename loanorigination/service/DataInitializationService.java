package com.loanorigination.service;

import com.loanorigination.entity.*;
import com.loanorigination.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// Temporarily disabled to prevent startup issues
@Component
public class DataInitializationService implements CommandLineRunner {

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
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;

    @Autowired
    private EmploymentDetailsRepository employmentDetailsRepository;

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private LoanDetailsRepository loanDetailsRepository;

    @Autowired
    private NomineeDetailsRepository nomineeDetailsRepository;

    @Autowired
    private ApplicationStatusHistoryRepository applicationStatusHistoryRepository;

    @Autowired
    private LoanDocumentRepository loanDocumentRepository;

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeLoanStatuses();
        initializeGenders();
        initializeMaritalStatuses();
        initializeOccupations();
        initializeDocumentTypes();
        initializeDefaultMembers();
        initializeCustomerUsers();
        
        // Initialize test data after all lookup tables and users are created
        initializePersonalDetails();
        initializeEmploymentDetails();
        initializeLoanApplications();
        // LoanDetails now uses explicit applicationId setting (no more @MapsId)
        initializeLoanDetails();
        // ApplicationStatusHistory fixed to use LoanStatusLookup references
        initializeApplicationStatusHistory();
        // TODO: Fix other entity relationship mappings before enabling these  
        // initializeNomineeDetails();
        // initializeApplicationStatusHistory();
        // initializeLoanDocuments();
    }

    private void initializeRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role("CUSTOMER"));
            roleRepository.save(new Role("MAKER"));
            roleRepository.save(new Role("CHECKER"));
        }
    }

    private void initializeLoanStatuses() {
        if (loanStatusLookupRepository.count() == 0) {
            loanStatusLookupRepository.save(new LoanStatusLookup("DRAFT"));
            loanStatusLookupRepository.save(new LoanStatusLookup("SUBMITTED"));
            loanStatusLookupRepository.save(new LoanStatusLookup("UNDER_REVIEW"));
            loanStatusLookupRepository.save(new LoanStatusLookup("PENDING_CHECKER_APPROVAL"));
            loanStatusLookupRepository.save(new LoanStatusLookup("APPROVED_BY_CHECKER"));
        }
    }

    private void initializeGenders() {
        if (genderLookupRepository.count() == 0) {
            genderLookupRepository.save(new GenderLookup("Male"));
            genderLookupRepository.save(new GenderLookup("Female"));
            genderLookupRepository.save(new GenderLookup("Other"));
        }
    }

    private void initializeMaritalStatuses() {
        if (maritalStatusLookupRepository.count() == 0) {
            maritalStatusLookupRepository.save(new MaritalStatusLookup("Single"));
            maritalStatusLookupRepository.save(new MaritalStatusLookup("Married"));
            maritalStatusLookupRepository.save(new MaritalStatusLookup("Divorced"));
            maritalStatusLookupRepository.save(new MaritalStatusLookup("Widowed"));
        }
    }

    private void initializeOccupations() {
        if (occupationLookupRepository.count() == 0) {
            occupationLookupRepository.save(new OccupationLookup("Software Engineer"));
            occupationLookupRepository.save(new OccupationLookup("Doctor"));
            occupationLookupRepository.save(new OccupationLookup("Teacher"));
            occupationLookupRepository.save(new OccupationLookup("Business Owner"));
            occupationLookupRepository.save(new OccupationLookup("Business Analyst"));
            occupationLookupRepository.save(new OccupationLookup("Government Employee"));
            occupationLookupRepository.save(new OccupationLookup("Others"));
        }
    }

    private void initializeDocumentTypes() {
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
    }

    private void initializeDefaultMembers() {
        if (memberRepository.count() == 0) {
            Role makerRole = roleRepository.findByRoleName("MAKER").orElse(null);
            Role checkerRole = roleRepository.findByRoleName("CHECKER").orElse(null);

            if (makerRole != null) {
                Member maker = new Member();
                maker.setUsername("kaushik");
                maker.setPasswordHash(passwordEncoder.encode("password123"));
                maker.setRole(makerRole);
                memberRepository.save(maker);
            }

            if (checkerRole != null) {
                Member checker = new Member();
                checker.setUsername("nipun");
                checker.setPasswordHash(passwordEncoder.encode("password123"));
                checker.setRole(checkerRole);
                memberRepository.save(checker);
            }
        }
    }

    private void initializeCustomerUsers() {
        if (userRepository.count() == 0) {
            // Create customer users with properly encoded passwords
            User user1 = new User();
            user1.setUsername("vinay");
            user1.setPasswordHash(passwordEncoder.encode("password123"));
            user1.setIsNewUser(false);
            userRepository.save(user1);

            User user2 = new User();
            user2.setUsername("shruti");
            user2.setPasswordHash(passwordEncoder.encode("password123"));
            user2.setIsNewUser(false);
            userRepository.save(user2);

            User user3 = new User();
            user3.setUsername("divya");
            user3.setPasswordHash(passwordEncoder.encode("password123"));
            user3.setIsNewUser(false);
            userRepository.save(user3);
        }
    }

    private void initializePersonalDetails() {
        if (personalDetailsRepository.count() == 0) {
            // Personal details for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            GenderLookup male = genderLookupRepository.findByGenderName("Male").orElse(null);
            MaritalStatusLookup single = maritalStatusLookupRepository.findByStatusName("Single").orElse(null);
            
            if (vinay != null && male != null && single != null) {
                PersonalDetails pd1 = new PersonalDetails();
                pd1.setUser(vinay);
                pd1.setFirstName("Vinay");
                pd1.setLastName("Kumar");
                pd1.setEmail("vinay.kumar@example.com");
                pd1.setDateOfBirth(java.time.LocalDate.of(1995, 3, 15));
                pd1.setGender(male);
                pd1.setMaritalStatus(single);
                pd1.setPhoneNumber("+91-9876543210");
                pd1.setCurrentAddress("123 Tech Park, Electronic City, Bangalore, Karnataka, 560100");
                pd1.setPermanentAddress("123 Tech Park, Electronic City, Bangalore, Karnataka, 560100");
                pd1.setAadhaarNumber("123456789012");
                pd1.setPanNumber("ABCDE1234F");
                personalDetailsRepository.save(pd1);
            }

            // Personal details for Shruti
            User shruti = userRepository.findByUsername("shruti").orElse(null);
            GenderLookup female = genderLookupRepository.findByGenderName("Female").orElse(null);
            MaritalStatusLookup married = maritalStatusLookupRepository.findByStatusName("Married").orElse(null);
            
            if (shruti != null && female != null && married != null) {
                PersonalDetails pd2 = new PersonalDetails();
                pd2.setUser(shruti);
                pd2.setFirstName("Shruti");
                pd2.setLastName("Sharma");
                pd2.setEmail("shruti.sharma@example.com");
                pd2.setDateOfBirth(java.time.LocalDate.of(1993, 7, 22));
                pd2.setGender(female);
                pd2.setMaritalStatus(married);
                pd2.setPhoneNumber("+91-9123456789");
                pd2.setCurrentAddress("456 Green Avenue, Koramangala, Bangalore, Karnataka, 560034");
                pd2.setPermanentAddress("456 Green Avenue, Koramangala, Bangalore, Karnataka, 560034");
                pd2.setAadhaarNumber("987654321098");
                pd2.setPanNumber("FGHIJ5678K");
                personalDetailsRepository.save(pd2);
            }

            // Personal details for Divya
            User divya = userRepository.findByUsername("divya").orElse(null);
            
            if (divya != null && female != null && single != null) {
                PersonalDetails pd3 = new PersonalDetails();
                pd3.setUser(divya);
                pd3.setFirstName("Divya");
                pd3.setLastName("Patel");
                pd3.setEmail("divya.patel@example.com");
                pd3.setDateOfBirth(java.time.LocalDate.of(1996, 9, 10));
                pd3.setGender(female);
                pd3.setMaritalStatus(single);
                pd3.setPhoneNumber("+91-8765432109");
                pd3.setCurrentAddress("789 Brigade Road, MG Road, Bangalore, Karnataka, 560025");
                pd3.setPermanentAddress("789 Brigade Road, MG Road, Bangalore, Karnataka, 560025");
                pd3.setAadhaarNumber("456789123456");
                pd3.setPanNumber("LMNOP9876Q");
                personalDetailsRepository.save(pd3);
            }
        }
    }

    private void initializeEmploymentDetails() {
        if (employmentDetailsRepository.count() == 0) {
            // Employment details for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            OccupationLookup softwareEngineer = occupationLookupRepository.findByOccupationName("Software Engineer").orElse(null);
            
            if (vinay != null && softwareEngineer != null) {
                EmploymentDetails ed1 = new EmploymentDetails();
                ed1.setUser(vinay);
                ed1.setEmployerName("TechCorp Solutions Pvt Ltd");
                ed1.setJobTitle("Senior Software Engineer");
                ed1.setWorkExperienceYears(4);
                ed1.setAnnualIncome(java.math.BigDecimal.valueOf(1020000.00));
                ed1.setEmployerAddress("Manyata Tech Park, Nagavara, Bangalore");
                ed1.setOccupation(softwareEngineer);
                employmentDetailsRepository.save(ed1);
            }

            // Employment details for Shruti
            User shruti = userRepository.findByUsername("shruti").orElse(null);
            OccupationLookup doctor = occupationLookupRepository.findByOccupationName("Doctor").orElse(null);
            
            if (shruti != null && doctor != null) {
                EmploymentDetails ed2 = new EmploymentDetails();
                ed2.setUser(shruti);
                ed2.setEmployerName("Manipal Hospital");
                ed2.setJobTitle("Consultant Physician");
                ed2.setWorkExperienceYears(6);
                ed2.setAnnualIncome(java.math.BigDecimal.valueOf(1440000.00));
                ed2.setEmployerAddress("HAL Airport Road, Marathahalli, Bangalore");
                ed2.setOccupation(doctor);
                employmentDetailsRepository.save(ed2);
            }

            // Employment details for Divya
            User divya = userRepository.findByUsername("divya").orElse(null);
            OccupationLookup businessAnalyst = occupationLookupRepository.findByOccupationName("Business Analyst").orElse(null);
            
            if (divya != null && businessAnalyst != null) {
                EmploymentDetails ed3 = new EmploymentDetails();
                ed3.setUser(divya);
                ed3.setEmployerName("Accenture Services Pvt Ltd");
                ed3.setJobTitle("Business Analyst");
                ed3.setWorkExperienceYears(3);
                ed3.setAnnualIncome(java.math.BigDecimal.valueOf(780000.00));
                ed3.setEmployerAddress("Embassy Golf Links, Intermediate Ring Road, Bangalore");
                ed3.setOccupation(businessAnalyst);
                employmentDetailsRepository.save(ed3);
            }
        }
    }

    private void initializeLoanApplications() {
        if (loanApplicationRepository.count() == 0) {
            // Loan application for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            LoanStatusLookup pendingChecker = loanStatusLookupRepository.findByStatusName("PENDING_CHECKER_APPROVAL").orElse(null);
            
            if (vinay != null && pendingChecker != null) {
                LoanApplication la1 = new LoanApplication();
                la1.setUser(vinay);
                la1.setStatus(pendingChecker);
                la1.setCreatedAt(java.time.LocalDateTime.of(2025, 8, 15, 10, 30, 0));
                loanApplicationRepository.save(la1);
            }

            // Loan application for Shruti
            User shruti = userRepository.findByUsername("shruti").orElse(null);
            LoanStatusLookup underReview = loanStatusLookupRepository.findByStatusName("UNDER_REVIEW").orElse(null);
            
            if (shruti != null && underReview != null) {
                LoanApplication la2 = new LoanApplication();
                la2.setUser(shruti);
                la2.setStatus(underReview);
                la2.setCreatedAt(java.time.LocalDateTime.of(2025, 8, 20, 14, 15, 0));
                loanApplicationRepository.save(la2);
            }

            // Loan application for Divya
            User divya = userRepository.findByUsername("divya").orElse(null);
            LoanStatusLookup submitted = loanStatusLookupRepository.findByStatusName("SUBMITTED").orElse(null);
            
            if (divya != null && submitted != null) {
                LoanApplication la3 = new LoanApplication();
                la3.setUser(divya);
                la3.setStatus(submitted);
                la3.setCreatedAt(java.time.LocalDateTime.of(2025, 8, 25, 16, 45, 0));
                loanApplicationRepository.save(la3);
            }
        }
    }

    private void initializeLoanDetails() {
        if (loanDetailsRepository.count() == 0) {
            // Loan details for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            Member kaushik = memberRepository.findByUsername("kaushik").orElse(null);
            
            if (vinay != null && kaushik != null) {
                LoanApplication vinayApp = loanApplicationRepository.findByUser(vinay).stream().findFirst().orElse(null);
                if (vinayApp != null) {
                    LoanDetails ld1 = new LoanDetails();
                    // No need to set ID manually - using auto-generated loanDetailsId now
                    ld1.setLoanApplication(vinayApp);
                    ld1.setLoanType("Personal Loan");
                    ld1.setAmount(java.math.BigDecimal.valueOf(500000.00));
                    ld1.setTenureMonths(36);
                    ld1.setInterestRate(java.math.BigDecimal.valueOf(12.5));
                    ld1.setMakerComments("All documents verified. Good credit profile.");
                    ld1.setMaker(kaushik);
                    ld1.setMakerApprovedAt(java.time.LocalDateTime.of(2025, 8, 16, 11, 45, 0));
                    loanDetailsRepository.save(ld1);
                }
            }

            // Loan details for Shruti
            User shruti = userRepository.findByUsername("shruti").orElse(null);
            Member nipun = memberRepository.findByUsername("nipun").orElse(null);
            
            if (shruti != null && kaushik != null && nipun != null) {
                LoanApplication shrutiApp = loanApplicationRepository.findByUser(shruti).stream().findFirst().orElse(null);
                if (shrutiApp != null) {
                    LoanDetails ld2 = new LoanDetails();
                    // No need to set ID manually - using auto-generated loanDetailsId now
                    ld2.setLoanApplication(shrutiApp);
                    ld2.setLoanType("Home Loan");
                    ld2.setAmount(java.math.BigDecimal.valueOf(2500000.00));
                    ld2.setTenureMonths(240);
                    ld2.setInterestRate(java.math.BigDecimal.valueOf(8.75));
                    ld2.setMakerComments("Excellent income profile. Property documents pending verification.");
                    ld2.setCheckerComments("Under review for final approval.");
                    ld2.setMaker(kaushik);
                    ld2.setChecker(nipun);
                    ld2.setMakerApprovedAt(java.time.LocalDateTime.of(2025, 8, 21, 16, 30, 0));
                    loanDetailsRepository.save(ld2);
                }
            }

            // Loan details for Divya
            User divya = userRepository.findByUsername("divya").orElse(null);
            
            if (divya != null) {
                LoanApplication divyaApp = loanApplicationRepository.findByUser(divya).stream().findFirst().orElse(null);
                if (divyaApp != null) {
                    LoanDetails ld3 = new LoanDetails();
                    // No need to set ID manually - using auto-generated loanDetailsId now
                    ld3.setLoanApplication(divyaApp);
                    ld3.setLoanType("Car Loan");
                    ld3.setAmount(java.math.BigDecimal.valueOf(800000.00));
                    ld3.setTenureMonths(60);
                    ld3.setInterestRate(java.math.BigDecimal.valueOf(9.5));
                    loanDetailsRepository.save(ld3);
                }
            }
        }
    }

    private void initializeNomineeDetails() {
        if (nomineeDetailsRepository.count() == 0) {
            // Nominee for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            if (vinay != null) {
                LoanApplication vinayApp = loanApplicationRepository.findByUser(vinay).stream().findFirst().orElse(null);
                if (vinayApp != null) {
                    NomineeDetails nd1 = new NomineeDetails();
                    nd1.setLoanApplication(vinayApp);
                    nd1.setNomineeName("Priya Kumar");
                    nd1.setRelationship("Sister");
                    nd1.setNomineeAddress("789 MG Road, Indiranagar, Bangalore");
                    nd1.setNomineePhone("+91-9876543210");
                    nd1.setNomineePan("KLMNO9012P");
                    nd1.setNomineeDob(java.time.LocalDate.of(1992, 11, 8));
                    nomineeDetailsRepository.save(nd1);
                }
            }

            // Nominee for Shruti
            User shruti = userRepository.findByUsername("shruti").orElse(null);
            if (shruti != null) {
                LoanApplication shrutiApp = loanApplicationRepository.findByUser(shruti).stream().findFirst().orElse(null);
                if (shrutiApp != null) {
                    NomineeDetails nd2 = new NomineeDetails();
                    nd2.setLoanApplication(shrutiApp);
                    nd2.setNomineeName("Amit Sharma");
                    nd2.setRelationship("Husband");
                    nd2.setNomineeAddress("456 Green Avenue, Koramangala, Bangalore");
                    nd2.setNomineePhone("+91-9123456789");
                    nd2.setNomineePan("PQRST3456U");
                    nd2.setNomineeDob(java.time.LocalDate.of(1990, 12, 10));
                    nomineeDetailsRepository.save(nd2);
                }
            }

            // Nominee for Divya
            User divya = userRepository.findByUsername("divya").orElse(null);
            if (divya != null) {
                LoanApplication divyaApp = loanApplicationRepository.findByUser(divya).stream().findFirst().orElse(null);
                if (divyaApp != null) {
                    NomineeDetails nd3 = new NomineeDetails();
                    nd3.setLoanApplication(divyaApp);
                    nd3.setNomineeName("Rakesh Patel");
                    nd3.setRelationship("Father");
                    nd3.setNomineeAddress("789 Brigade Road, MG Road, Bangalore");
                    nd3.setNomineePhone("+91-9876543210");
                    nd3.setNomineePan("UVWXY7890Z");
                    nd3.setNomineeDob(java.time.LocalDate.of(1968, 5, 15));
                    nomineeDetailsRepository.save(nd3);
                }
            }
        }
    }

    private void initializeApplicationStatusHistory() {
        if (applicationStatusHistoryRepository.count() == 0) {
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            Member kaushik = memberRepository.findByUsername("kaushik").orElse(null);
            
            if (vinay != null && kaushik != null) {
                LoanApplication vinayApp = loanApplicationRepository.findByUser(vinay).stream().findFirst().orElse(null);
                if (vinayApp != null) {
                    // Get status lookups
                    LoanStatusLookup submitted = loanStatusLookupRepository.findByStatusName("SUBMITTED").orElse(null);
                    LoanStatusLookup underReview = loanStatusLookupRepository.findByStatusName("UNDER_REVIEW").orElse(null);
                    LoanStatusLookup pendingChecker = loanStatusLookupRepository.findByStatusName("PENDING_CHECKER_APPROVAL").orElse(null);
                    
                    // Status history for Vinay's application - SUBMITTED
                    if (submitted != null) {
                        ApplicationStatusHistory ash1 = new ApplicationStatusHistory();
                        ash1.setLoanApplication(vinayApp);
                        ash1.setMember(kaushik);
                        ash1.setStatus(submitted);
                        ash1.setChangedAt(java.time.LocalDateTime.of(2025, 8, 15, 10, 30, 0));
                        applicationStatusHistoryRepository.save(ash1);
                    }

                    // Status history - UNDER_REVIEW
                    if (underReview != null) {
                        ApplicationStatusHistory ash2 = new ApplicationStatusHistory();
                        ash2.setLoanApplication(vinayApp);
                        ash2.setMember(kaushik);
                        ash2.setStatus(underReview);
                        ash2.setChangedAt(java.time.LocalDateTime.of(2025, 8, 16, 9, 15, 0));
                        applicationStatusHistoryRepository.save(ash2);
                    }

                    // Status history - PENDING_CHECKER_APPROVAL
                    if (pendingChecker != null) {
                        ApplicationStatusHistory ash3 = new ApplicationStatusHistory();
                        ash3.setLoanApplication(vinayApp);
                        ash3.setMember(kaushik);
                        ash3.setStatus(pendingChecker);
                        ash3.setChangedAt(java.time.LocalDateTime.of(2025, 8, 16, 11, 45, 0));
                        applicationStatusHistoryRepository.save(ash3);
                    }
                }
            }

            // Similar status history for other users can be added here
        }
    }

    private void initializeLoanDocuments() {
        if (loanDocumentRepository.count() == 0) {
            // Documents for Vinay
            User vinay = userRepository.findByUsername("vinay").orElse(null);
            if (vinay != null) {
                LoanApplication vinayApp = loanApplicationRepository.findByUser(vinay).stream().findFirst().orElse(null);
                if (vinayApp != null) {
                    // Get document types
                    DocumentType aadhaar = documentTypeRepository.findByName("Aadhaar Card").orElse(null);
                    DocumentType pan = documentTypeRepository.findByName("PAN Card").orElse(null);
                    DocumentType salary = documentTypeRepository.findByName("Salary Certificate").orElse(null);
                    DocumentType bankStatement = documentTypeRepository.findByName("Bank Statements").orElse(null);

                    if (aadhaar != null) {
                        LoanDocument ld1 = new LoanDocument();
                        ld1.setLoanApplication(vinayApp);
                        ld1.setDocumentType(aadhaar);
                        ld1.setFilePath("/uploads/documents/vinay_aadhar_card.pdf");
                        ld1.setIsVerified(true);
                        loanDocumentRepository.save(ld1);
                    }

                    if (pan != null) {
                        LoanDocument ld2 = new LoanDocument();
                        ld2.setLoanApplication(vinayApp);
                        ld2.setDocumentType(pan);
                        ld2.setFilePath("/uploads/documents/vinay_pan_card.pdf");
                        ld2.setIsVerified(true);
                        loanDocumentRepository.save(ld2);
                    }

                    if (salary != null) {
                        LoanDocument ld3 = new LoanDocument();
                        ld3.setLoanApplication(vinayApp);
                        ld3.setDocumentType(salary);
                        ld3.setFilePath("/uploads/documents/vinay_salary_slip.pdf");
                        ld3.setIsVerified(true);
                        loanDocumentRepository.save(ld3);
                    }

                    if (bankStatement != null) {
                        LoanDocument ld4 = new LoanDocument();
                        ld4.setLoanApplication(vinayApp);
                        ld4.setDocumentType(bankStatement);
                        ld4.setFilePath("/uploads/documents/vinay_bank_statement.pdf");
                        ld4.setIsVerified(true);
                        loanDocumentRepository.save(ld4);
                    }
                }
            }

            // Similar document setup for other users can be added here
        }
    }

}
