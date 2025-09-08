package com.loanorigination.repository;

import com.loanorigination.entity.LoanApplication;
import com.loanorigination.entity.LoanStatusLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Integer> {
    
    List<LoanApplication> findByUserCustomerId(Integer customerId);
    
    List<LoanApplication> findByUser(com.loanorigination.entity.User user);
    
    List<LoanApplication> findByStatus(LoanStatusLookup status);
    
    @Query("SELECT la FROM LoanApplication la WHERE la.status.statusName = :statusName")
    List<LoanApplication> findByStatusName(@Param("statusName") String statusName);
    
    @Query("SELECT la FROM LoanApplication la WHERE la.status.statusName IN :statusNames")
    List<LoanApplication> findByStatusNameIn(@Param("statusNames") List<String> statusNames);
}
