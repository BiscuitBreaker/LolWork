package com.loanorigination.repository;

import com.loanorigination.entity.MaritalStatusLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MaritalStatusLookupRepository extends JpaRepository<MaritalStatusLookup, Long> {
    Optional<MaritalStatusLookup> findByStatusName(String statusName);
}
