package com.loanorigination.repository;

import com.loanorigination.entity.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {

    Optional<PersonalDetails> findByUserId(Long userId);

}
