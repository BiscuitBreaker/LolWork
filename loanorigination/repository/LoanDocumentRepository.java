package com.loanorigination.repository;

import com.loanorigination.entity.LoanDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanDocumentRepository extends JpaRepository<LoanDocument, Long> {
    
    /**
     * Find all documents for a specific loan application
     */
    List<LoanDocument> findByLoanApplicationApplicationId(Long applicationId);
    
    /**
     * Find documents by type for an application
     */
    List<LoanDocument> findByLoanApplicationApplicationIdAndDocumentTypeDocumentTypeId(Long applicationId, Long documentTypeId);
    
    /**
     * Count documents for an application
     */
    long countByLoanApplicationApplicationId(Long applicationId);
}
