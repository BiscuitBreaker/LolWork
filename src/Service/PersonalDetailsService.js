// src/Service/PersonalDetailsService.js
import api from './api';

export const PersonalDetailsService = {
  // Get current user's personal details
  async getMyPersonalDetails() {
    try {
      console.log('PersonalDetailsService: Fetching personal details...');
      const response = await api.get('/personal-details/me');
      console.log('PersonalDetailsService: Personal details fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.log('PersonalDetailsService: Error fetching personal details:', error.response?.status, error.message);
      if (error.response?.status === 404) {
        console.log('PersonalDetailsService: No personal details found (404) - this is normal for new users');
        return null;
      }
      throw error;
    }
  },

  // Get personal details by user ID (for admin/member use)
  async getPersonalDetailsByUserId(userId) {
    const response = await api.get(`/personal-details/user/${userId}`);
    return response.data;
  },

  // Create personal details for current user
  async createPersonalDetails(personalDetailsData) {
    const response = await api.post('/personal-details/me', personalDetailsData);
    return response.data;
  },

  // Update personal details for current user
  async updatePersonalDetails(personalDetailsData) {
    const response = await api.put('/personal-details/me', personalDetailsData);
    return response.data;
  },

  // Delete personal details for current user
  async deletePersonalDetails() {
    const response = await api.delete('/personal-details/me');
    return response.data;
  },

  // Get all personal details (for admin/member use)
  async getAllPersonalDetails() {
    const response = await api.get('/personal-details');
    return response.data;
  },

  // Get lookup data for forms
  async getLookupData() {
    try {
      console.log('PersonalDetailsService: Fetching lookup data...');
      const [genders, maritalStatuses] = await Promise.all([
        api.get('/lookup/genders'),
        api.get('/lookup/marital-statuses')
      ]);

      const lookupData = {
        genders: genders.data,
        maritalStatuses: maritalStatuses.data
      };
      console.log('PersonalDetailsService: Lookup data fetched successfully:', lookupData);
      return lookupData;
    } catch (error) {
      console.error('PersonalDetailsService: Error fetching lookup data:', error);
      throw error;
    }
  }
};

export default PersonalDetailsService;
