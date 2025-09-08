package com.loanorigination.repository;

import com.loanorigination.entity.EmploymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmploymentDetailsRepository extends JpaRepository<EmploymentDetails, Long> {

    Optional<EmploymentDetails> findByUserId(Long userId);

}
