package com.loanorigination.controller;

import com.loanorigination.entity.GenderLookup;
import com.loanorigination.entity.MaritalStatusLookup;
import com.loanorigination.entity.OccupationLookup;
import com.loanorigination.repository.GenderLookupRepository;
import com.loanorigination.repository.MaritalStatusLookupRepository;
import com.loanorigination.repository.OccupationLookupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lookup")
@CrossOrigin(origins = "http://localhost:3000")
public class LookupController {

    @Autowired
    private GenderLookupRepository genderLookupRepository;

    @Autowired
    private MaritalStatusLookupRepository maritalStatusLookupRepository;

    @Autowired
    private OccupationLookupRepository occupationLookupRepository;

    /**
     * Get all genders for dropdown lists
     */
    @GetMapping("/genders")
    public ResponseEntity<List<GenderLookup>> getAllGenders() {
        try {
            List<GenderLookup> genders = genderLookupRepository.findAll();
            return ResponseEntity.ok(genders);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all marital statuses for dropdown lists
     */
    @GetMapping("/marital-statuses")
    public ResponseEntity<List<MaritalStatusLookup>> getAllMaritalStatuses() {
        try {
            List<MaritalStatusLookup> maritalStatuses = maritalStatusLookupRepository.findAll();
            return ResponseEntity.ok(maritalStatuses);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get all occupations for dropdown lists
     */
    @GetMapping("/occupations")
    public ResponseEntity<List<OccupationLookup>> getAllOccupations() {
        try {
            List<OccupationLookup> occupations = occupationLookupRepository.findAll();
            return ResponseEntity.ok(occupations);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get specific gender by ID
     */
    @GetMapping("/genders/{id}")
    public ResponseEntity<GenderLookup> getGenderById(@PathVariable Long id) {
        try {
            return genderLookupRepository.findById(id)
                    .map(gender -> ResponseEntity.ok(gender))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get specific marital status by ID
     */
    @GetMapping("/marital-statuses/{id}")
    public ResponseEntity<MaritalStatusLookup> getMaritalStatusById(@PathVariable Long id) {
        try {
            return maritalStatusLookupRepository.findById(id)
                    .map(status -> ResponseEntity.ok(status))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Get specific occupation by ID
     */
    @GetMapping("/occupations/{id}")
    public ResponseEntity<OccupationLookup> getOccupationById(@PathVariable Long id) {
        try {
            return occupationLookupRepository.findById(id)
                    .map(occupation -> ResponseEntity.ok(occupation))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
