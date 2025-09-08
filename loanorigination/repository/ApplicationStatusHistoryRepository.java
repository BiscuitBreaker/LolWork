package com.loanorigination.repository;

import com.loanorigination.entity.ApplicationStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationStatusHistoryRepository extends JpaRepository<ApplicationStatusHistory, Long> {
    
    /**
     * Find all status changes for a specific loan application
     */
    List<ApplicationStatusHistory> findByLoanApplicationApplicationIdOrderByChangedAtDesc(Long applicationId);
    
    /**
     * Find status changes by a specific member
     */
    List<ApplicationStatusHistory> findByMemberMemberIdOrderByChangedAtDesc(Long memberId);
    
    /**
     * Find recent status changes (last 30 days)
     */
    @Query("SELECT ash FROM ApplicationStatusHistory ash WHERE ash.changedAt >= CURRENT_DATE - 30 ORDER BY ash.changedAt DESC")
    List<ApplicationStatusHistory> findRecentStatusChanges();
    
    /**
     * Count status changes for an application
     */
    long countByLoanApplicationApplicationId(Long applicationId);
}
