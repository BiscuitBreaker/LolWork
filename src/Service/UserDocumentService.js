// src/Service/UserDocumentService.js
import api from './api';

const UserDocumentService = {
  // Upload a document
  async uploadDocument(file, documentType) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    const response = await api.post('/user-documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get all user documents
  async getMyDocuments() {
    const response = await api.get('/user-documents/my-documents');
    return response.data;
  },

  // Get document by type
  async getDocumentByType(documentTypeName) {
    try {
      const response = await api.get(`/user-documents/my-documents/by-type/${documentTypeName}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // Document not found
      }
      throw error;
    }
  },

  // Delete a document
  async deleteDocument(documentId) {
    const response = await api.delete(`/user-documents/${documentId}`);
    return response.data;
  },

  // Get all available document types
  async getDocumentTypes() {
    const response = await api.get('/user-documents/document-types');
    return response.data;
  },

  // Validate file before upload
  validateFile(file) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      throw new Error('No file selected');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('File type not allowed. Please upload PDF, JPG, JPEG, or PNG files only.');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    return true;
  },

  // Get file extension
  getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  },

  // Format file size for display
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Check if document type has been uploaded
  async hasDocument(documentTypeName) {
    try {
      const document = await this.getDocumentByType(documentTypeName);
      return document !== null;
    } catch (error) {
      return false;
    }
  },

  // Get upload status for multiple document types
  async getUploadStatus(documentTypes) {
    try {
      const documents = await this.getMyDocuments();
      const status = {};
      
      documentTypes.forEach(docType => {
        const found = documents.find(doc => doc.documentType.name === docType);
        status[docType] = {
          uploaded: !!found,
          verified: found ? found.isVerified : false,
          document: found || null
        };
      });
      
      return status;
    } catch (error) {
      console.error('Error getting upload status:', error);
      return {};
    }
  }
};

export default UserDocumentService;
