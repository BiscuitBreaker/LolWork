package com.loanorigination.service;

import com.loanorigination.entity.*;
import com.loanorigination.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Arrays;

@Service
public class UserDocumentService {
    
    @Autowired
    private UserDocumentRepository userDocumentRepository;
    
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Upload directory configuration
    private static final String UPLOAD_DIR = "uploads";
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("pdf", "jpg", "jpeg", "png");
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    public UserDocument uploadDocument(String username, MultipartFile file, String documentTypeName) 
            throws IOException, IllegalArgumentException {
        
        // Validate file
        validateFile(file);
        
        // Get user
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        // Get document type
        DocumentType documentType = documentTypeRepository.findByName(documentTypeName)
            .orElseThrow(() -> new EntityNotFoundException("Document type not found: " + documentTypeName));
        
        // Check if user already has this document type (replace if exists)
        Optional<UserDocument> existingDoc = userDocumentRepository
            .findFirstByUserCustomerIdAndDocumentTypeDocumentTypeId(user.getCustomerId(), documentType.getDocumentTypeId().intValue());
        
        // Create upload directory
        String userUploadDir = UPLOAD_DIR + File.separator + "user_" + user.getCustomerId();
        Path uploadPath = Paths.get(userUploadDir);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(originalFilename);
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String newFilename = documentTypeName.toLowerCase().replace(" ", "_") + "_" + timestamp + "." + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(newFilename);
        Files.copy(file.getInputStream(), filePath);
        
        // If existing document, delete old file and update record
        if (existingDoc.isPresent()) {
            UserDocument existing = existingDoc.get();
            deleteFileIfExists(existing.getFilePath());
            existing.setFilePath(filePath.toString());
            existing.setIsVerified(false); // Reset verification status
            return userDocumentRepository.save(existing);
        } else {
            // Create new document record
            UserDocument userDocument = new UserDocument(user, documentType, filePath.toString());
            return userDocumentRepository.save(userDocument);
        }
    }
    
    public List<UserDocument> getUserDocuments(String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        return userDocumentRepository.findByUserCustomerId(user.getCustomerId());
    }
    
    public UserDocument getUserDocumentByType(String username, String documentTypeName) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        DocumentType documentType = documentTypeRepository.findByName(documentTypeName)
            .orElseThrow(() -> new EntityNotFoundException("Document type not found: " + documentTypeName));
        
        return userDocumentRepository.findFirstByUserCustomerIdAndDocumentTypeDocumentTypeId(
                user.getCustomerId(), documentType.getDocumentTypeId().intValue())
            .orElseThrow(() -> new EntityNotFoundException("Document not found"));
    }
    
    public void deleteDocument(String username, Long documentId) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
        
        UserDocument document = userDocumentRepository.findById(documentId)
            .orElseThrow(() -> new EntityNotFoundException("Document not found: " + documentId));
        
        // Verify user owns this document
        if (!document.getUser().getCustomerId().equals(user.getCustomerId())) {
            throw new IllegalArgumentException("Not authorized to delete this document");
        }
        
        // Delete file from filesystem
        deleteFileIfExists(document.getFilePath());
        
        // Delete record from database
        userDocumentRepository.delete(document);
    }
    
    public List<DocumentType> getAllDocumentTypes() {
        return documentTypeRepository.findAll();
    }
    
    private void validateFile(MultipartFile file) throws IllegalArgumentException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds maximum limit of 5MB");
        }
        
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Filename is null");
        }
        
        String extension = getFileExtension(filename).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException("File type not allowed. Allowed types: " + ALLOWED_EXTENSIONS);
        }
    }
    
    private String getFileExtension(String filename) {
        if (filename == null || filename.lastIndexOf('.') == -1) {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
    
    private void deleteFileIfExists(String filePath) {
        try {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Log error but don't throw exception
            System.err.println("Failed to delete file: " + filePath + " - " + e.getMessage());
        }
    }
}
