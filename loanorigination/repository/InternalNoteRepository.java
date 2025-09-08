package com.loanorigination.repository;

import com.loanorigination.entity.InternalNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternalNoteRepository extends JpaRepository<InternalNote, Long> {
    
    /**
     * Find all notes for a specific loan application
     */
    List<InternalNote> findByLoanApplicationApplicationIdOrderByCreatedAtDesc(Long applicationId);
    
    /**
     * Find notes by a specific member
     */
    List<InternalNote> findByMemberMemberIdOrderByCreatedAtDesc(Long memberId);
    
    /**
     * Count notes for an application
     */
    long countByLoanApplicationApplicationId(Long applicationId);
}
