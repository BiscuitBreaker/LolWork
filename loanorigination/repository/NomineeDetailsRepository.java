package com.loanorigination.repository;

import com.loanorigination.entity.NomineeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NomineeDetailsRepository extends JpaRepository<NomineeDetails, Long> {
    
    /**
     * Find nominee details by application ID
     */
    List<NomineeDetails> findByLoanApplicationApplicationId(Long applicationId);
    
    /**
     * Find nominees by relationship
     */
    List<NomineeDetails> findByRelationship(String relationship);
    
    /**
     * Find nominees by name (partial match)
     */
    List<NomineeDetails> findByNomineeNameContainingIgnoreCase(String name);
    
    /**
     * Find nominees with phone numbers
     */
    List<NomineeDetails> findByNomineePhoneIsNotNull();
    
    /**
     * Find nominees by PAN number
     */
    Optional<NomineeDetails> findByNomineePan(String nomineePan);
    
    /**
     * Check if application has nominee
     */
    boolean existsByLoanApplicationApplicationId(Long applicationId);
    
    /**
     * Count nominees by relationship type
     */
    @Query("SELECT nd.relationship, COUNT(nd) FROM NomineeDetails nd GROUP BY nd.relationship")
    List<Object[]> countByRelationshipType();
}
