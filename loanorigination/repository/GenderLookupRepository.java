package com.loanorigination.repository;

import com.loanorigination.entity.GenderLookup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GenderLookupRepository extends JpaRepository<GenderLookup, Long> {
    Optional<GenderLookup> findByGenderName(String genderName);
}
