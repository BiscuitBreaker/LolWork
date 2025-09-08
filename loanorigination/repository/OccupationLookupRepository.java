package com.loanorigination.repository;

import com.loanorigination.entity.OccupationLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OccupationLookupRepository extends JpaRepository<OccupationLookup, Long> {
    Optional<OccupationLookup> findByOccupationName(String occupationName);
}
