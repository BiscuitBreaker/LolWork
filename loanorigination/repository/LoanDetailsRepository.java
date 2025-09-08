package com.loanorigination.repository;

import com.loanorigination.entity.LoanDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanDetailsRepository extends JpaRepository<LoanDetails, Long> {
    
    /**
     * Find loan details by loan application
     */
    Optional<LoanDetails> findByLoanApplication_ApplicationId(Long applicationId);
    
    /**
     * Find loans by loan type
     */
    List<LoanDetails> findByLoanType(String loanType);
    
    /**
     * Find loans by amount range
     */
    List<LoanDetails> findByAmountBetween(java.math.BigDecimal minAmount, java.math.BigDecimal maxAmount);
    
    /**
     * Find loans by tenure in months
     */
    List<LoanDetails> findByTenureMonths(Integer tenureMonths);
    
    /**
     * Find loans by maker
     */
    List<LoanDetails> findByMakerMemberId(Long makerId);
    
    /**
     * Find loans by checker
     */
    List<LoanDetails> findByCheckerMemberId(Long checkerId);
}
