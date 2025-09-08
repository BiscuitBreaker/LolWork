package com.loanorigination.repository;

import com.loanorigination.entity.UserDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDocumentRepository extends JpaRepository<UserDocument, Long> {
    
    /**
     * Find all documents for a specific user
     */
    List<UserDocument> findByUserCustomerId(Long customerId);
    
    /**
     * Find documents by type for a user
     */
    List<UserDocument> findByUserCustomerIdAndDocumentTypeDocumentTypeId(Long customerId, Long documentTypeId);
    
    /**
     * Find first document by type for a user
     */
    Optional<UserDocument> findFirstByUserCustomerIdAndDocumentTypeDocumentTypeId(Long customerId, Integer documentTypeId);
    
    /**
     * Find documents by document type
     */
    List<UserDocument> findByDocumentTypeDocumentTypeId(Long documentTypeId);
    
    /**
     * Count documents for a user
     */
    long countByUserCustomerId(Integer customerId);
    
    /**
     * Check if user has specific document type
     */
    boolean existsByUserCustomerIdAndDocumentTypeDocumentTypeId(Integer customerId, Integer documentTypeId);
}
