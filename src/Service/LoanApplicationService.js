// src/Service/LoanApplicationService.js
import api from './api';

export const LoanApplicationService = {
  // Get all loan applications for current user
  async getMyLoanApplications() {
    const response = await api.get('/loan-applications/my-applications');
    return response.data;
  },

  // Get current/latest loan application
  async getCurrentLoanApplication() {
    const response = await api.get('/loan-applications/current');
    return response.data;
  },

  // Get loan application by ID
  async getLoanApplicationById(applicationId) {
    const response = await api.get(`/loan-applications/${applicationId}`);
    return response.data;
  },

  // Get application progress
  async getApplicationProgress() {
    const response = await api.get('/loan-applications/progress');
    return response.data;
  },

  // Get loan application status
  async getLoanApplicationStatus() {
    const response = await api.get('/loan-applications/status');
    return response.data;
  }
};

export default LoanApplicationService;
