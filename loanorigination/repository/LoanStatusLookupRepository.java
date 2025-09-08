package com.loanorigination.repository;

import com.loanorigination.entity.LoanStatusLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LoanStatusLookupRepository extends JpaRepository<LoanStatusLookup, Long> {
    Optional<LoanStatusLookup> findByStatusName(String statusName);
}
