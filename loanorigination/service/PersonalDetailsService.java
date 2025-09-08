package com.loanorigination.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loanorigination.entity.PersonalDetails;
import com.loanorigination.entity.User;
import com.loanorigination.entity.GenderLookup;
import com.loanorigination.entity.MaritalStatusLookup;
import com.loanorigination.repository.PersonalDetailsRepository;
import com.loanorigination.repository.UserRepository;
import com.loanorigination.repository.GenderLookupRepository;
import com.loanorigination.repository.MaritalStatusLookupRepository;
import com.loanorigination.dto.PersonalDetailsDTO;

import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDateTime;

@Service
public class PersonalDetailsService {

    @Autowired
    private PersonalDetailsRepository personalDetailsRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GenderLookupRepository genderLookupRepository;
    
    @Autowired
    private MaritalStatusLookupRepository maritalStatusLookupRepository;

    public PersonalDetails getPersonalDetailsByUsername(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        return personalDetailsRepository.findByUserId(user.getCustomerId())
            .orElseThrow(() -> new EntityNotFoundException("Personal details not found for user: " + username));
    }

    public PersonalDetails createPersonalDetails(String username, PersonalDetailsDTO dto) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        // Check if personal details already exist
        if (personalDetailsRepository.findByUserId(user.getCustomerId()).isPresent()) {
            throw new IllegalStateException("Personal details already exist for user: " + username);
        }
        
        PersonalDetails personalDetails = new PersonalDetails();
        populatePersonalDetailsFromDTO(personalDetails, dto, user);
        personalDetails.setUpdatedAt(LocalDateTime.now());
        
        return personalDetailsRepository.save(personalDetails);
    }

    public PersonalDetails updatePersonalDetails(String username, PersonalDetailsDTO dto) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        PersonalDetails existingDetails = personalDetailsRepository.findByUserId(user.getCustomerId())
            .orElseThrow(() -> new EntityNotFoundException("Personal details not found for user: " + username));
        
        populatePersonalDetailsFromDTO(existingDetails, dto, user);
        existingDetails.setUpdatedAt(LocalDateTime.now());
        
        return personalDetailsRepository.save(existingDetails);
    }

    private void populatePersonalDetailsFromDTO(PersonalDetails personalDetails, PersonalDetailsDTO dto, User user) {
        personalDetails.setUser(user);
        personalDetails.setFirstName(dto.getFirstName());
        personalDetails.setMiddleName(dto.getMiddleName());
        personalDetails.setLastName(dto.getLastName());
        personalDetails.setDateOfBirth(dto.getDateOfBirth());
        personalDetails.setPhoneNumber(dto.getPhoneNumber());
        personalDetails.setEmail(dto.getEmail());
        personalDetails.setAadhaarNumber(dto.getAadhaarNumber());
        personalDetails.setPanNumber(dto.getPanNumber());
        personalDetails.setCurrentAddress(dto.getCurrentAddress());
        personalDetails.setPermanentAddress(dto.getPermanentAddress());
        
        // Set gender lookup
        GenderLookup gender = genderLookupRepository.findById(dto.getGenderId())
            .orElseThrow(() -> new EntityNotFoundException("Gender not found: " + dto.getGenderId()));
        personalDetails.setGender(gender);
        
        // Set marital status lookup
        MaritalStatusLookup maritalStatus = maritalStatusLookupRepository.findById(dto.getMaritalStatusId())
            .orElseThrow(() -> new EntityNotFoundException("Marital status not found: " + dto.getMaritalStatusId()));
        personalDetails.setMaritalStatus(maritalStatus);
    }
}