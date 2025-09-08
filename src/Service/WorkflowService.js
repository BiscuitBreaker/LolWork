// src/Service/WorkflowService.js
import api from './api';

export const WorkflowService = {
  // Maker functions
  async getMakerPendingApplications() {
    const response = await api.get('/workflow/maker/pending');
    return response.data;
  },

  async processMakerAction(applicationId, action, comments = '') {
    const response = await api.post(`/workflow/maker/process/${applicationId}`, {
      action,
      comments
    });
    return response.data;
  },

  // Checker functions
  async getCheckerPendingApplications() {
    const response = await api.get('/workflow/checker/pending');
    return response.data;
  },

  async processCheckerAction(applicationId, action, comments = '') {
    const response = await api.post(`/workflow/checker/process/${applicationId}`, {
      action,
      comments
    });
    return response.data;
  },

  // Common functions
  async getApplicationDetails(applicationId) {
    const response = await api.get(`/workflow/application/${applicationId}/details`);
    return response.data;
  }
};

export default WorkflowService;
