package com.loanorigination.controller;

import com.loanorigination.entity.UserDocument;
import com.loanorigination.service.UserDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-documents")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "User Documents", description = "User document management APIs")
public class UserDocumentController {
    
    @Autowired
    private UserDocumentService userDocumentService;

    @PostMapping("/upload")
    @Operation(summary = "Upload user document", description = "Upload a document for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Document uploaded successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid file or document type"),
        @ApiResponse(responseCode = "500", description = "File upload failed")
    })
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentTypeName,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            UserDocument savedDocument = userDocumentService.uploadDocument(username, file, documentTypeName);
            return ResponseEntity.ok(Map.of(
                "message", "Document uploaded successfully",
                "document", savedDocument
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to upload document: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/my-documents")
    @Operation(summary = "Get my documents", description = "Retrieve all documents for the authenticated user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Documents retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "No documents found")
    })
    public ResponseEntity<List<UserDocument>> getMyDocuments(Authentication authentication) {
        try {
            String username = authentication.getName();
            List<UserDocument> documents = userDocumentService.getUserDocuments(username);
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/my-documents/by-type/{documentTypeName}")
    @Operation(summary = "Get document by type", description = "Get user's document by document type name")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Document found"),
        @ApiResponse(responseCode = "404", description = "Document not found")
    })
    public ResponseEntity<UserDocument> getDocumentByType(
            @PathVariable String documentTypeName,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            UserDocument document = userDocumentService.getUserDocumentByType(username, documentTypeName);
            return ResponseEntity.ok(document);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{documentId}")
    @Operation(summary = "Delete document", description = "Delete a user document by ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Document deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Document not found"),
        @ApiResponse(responseCode = "403", description = "Not authorized to delete this document")
    })
    public ResponseEntity<?> deleteDocument(
            @PathVariable Long documentId,
            Authentication authentication) {
        try {
            String username = authentication.getName();
            userDocumentService.deleteDocument(username, documentId);
            return ResponseEntity.ok(Map.of("message", "Document deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to delete document: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/document-types")
    @Operation(summary = "Get all document types", description = "Get all available document types for upload")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Document types retrieved successfully")
    })
    public ResponseEntity<?> getDocumentTypes() {
        try {
            return ResponseEntity.ok(userDocumentService.getAllDocumentTypes());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to retrieve document types: " + e.getMessage()
            ));
        }
    }
}
