import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  FileText,
  ArrowLeft,
  Check,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import { getCurrentUser, isAuthenticated } from "./Service/AuthService";
import PersonalDetailsService from "./Service/PersonalDetailsService";
import UserDocumentService from "./Service/UserDocumentService";

// Simple component for a circular progress bar
const CircularProgressBar = ({ progress }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-300"
          stroke="currentColor"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="transparent"
          stroke="currentColor"
          strokeLinecap="round"
          className="text-sc-blue-600"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900">{`${progress}%`}</span>
      </div>
    </div>
  );
};

const CustomerProfile = () => {
  const navigate = useNavigate();
  
  // Authentication and user state
  const [personalDetails, setPersonalDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    panNumber: "",
    currentAddress: "",
    permanentAddress: "",
    genderId: "",
    maritalStatusId: ""
  });
  
  // UI state
  const [userDocuments, setUserDocuments] = useState({
    "Aadhaar Card": { name: "Aadhaar Card", status: "Missing", file: null, document: null },
    "PAN Card": { name: "PAN Card", status: "Missing", file: null, document: null },
    "Passport": { name: "Passport", status: "Missing", file: null, document: null },
  });
  const [editMode, setEditMode] = useState(false);
  const [completion, setCompletion] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({});
  const [lookupData, setLookupData] = useState({
    genders: [],
    maritalStatuses: []
  });

  // Check authentication and fetch data on component mount
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          console.log('CustomerProfile: User not authenticated, redirecting...');
          navigate('/customer');
          return;
        }

        // Get current user from localStorage
        const user = getCurrentUser();
        console.log('CustomerProfile: Current user:', user);

        // Fetch lookup data first (independent of personal details)
        try {
          console.log('CustomerProfile: Fetching lookup data...');
          const lookups = await PersonalDetailsService.getLookupData();
          setLookupData(lookups);
          console.log('CustomerProfile: Lookup data fetched successfully', lookups);
        } catch (err) {
          console.log('CustomerProfile: Failed to fetch lookup data:', err);
        }

        // Then fetch personal details
        let personalDetailsData = null;
        try {
          console.log('CustomerProfile: Fetching personal details...');
          personalDetailsData = await PersonalDetailsService.getMyPersonalDetails();
        } catch (err) {
          console.log('CustomerProfile: Failed to fetch personal details:', err);
          // This is normal for new users who haven't filled their profile yet
        }

        console.log('CustomerProfile: Personal details result:', personalDetailsData);
        
        // Fetch user documents
        try {
          console.log('CustomerProfile: Fetching user documents...');
          const documentStatus = await UserDocumentService.getUploadStatus(['Aadhaar Card', 'PAN Card', 'Passport']);
          
          // Update document state with real data
          setUserDocuments(prevDocs => {
            const updatedDocs = { ...prevDocs };
            Object.keys(documentStatus).forEach(docType => {
              if (updatedDocs[docType]) {
                updatedDocs[docType].status = documentStatus[docType].uploaded ? 
                  (documentStatus[docType].verified ? "Verified" : "Uploaded") : "Missing";
                updatedDocs[docType].document = documentStatus[docType].document;
              }
            });
            return updatedDocs;
          });
          
          console.log('CustomerProfile: Document status loaded:', documentStatus);
        } catch (err) {
          console.log('CustomerProfile: Failed to fetch documents:', err);
        }
        
        if (personalDetailsData) {
          setPersonalDetails(personalDetailsData);
          // Populate form data from backend
          setUserData({
            firstName: personalDetailsData.firstName || "",
            lastName: personalDetailsData.lastName || "",
            middleName: personalDetailsData.middleName || "",
            email: personalDetailsData.email || "",
            phoneNumber: personalDetailsData.phoneNumber || "",
            dateOfBirth: personalDetailsData.dateOfBirth || "",
            aadhaarNumber: personalDetailsData.aadhaarNumber || "",
            panNumber: personalDetailsData.panNumber || "",
            currentAddress: personalDetailsData.currentAddress || "",
            permanentAddress: personalDetailsData.permanentAddress || "",
            genderId: personalDetailsData.gender?.id || "",
            maritalStatusId: personalDetailsData.maritalStatus?.id || ""
          });
        } else {
          // No personal details yet, user will need to create them
          console.log('CustomerProfile: No personal details found, user needs to create them');
          setPersonalDetails(null);
        }
        
      } catch (err) {
        console.error('CustomerProfile: Unexpected error during initialization:', err);
        setError('Failed to initialize profile. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const calculateCompletion = useCallback(() => {
    let completedFields = 0;
    const totalFields = Object.keys(userData).length + Object.keys(userDocuments).length;

    // Count filled text fields
    for (const key in userData) {
      if (userData[key] && userData[key] !== "") {
        completedFields++;
      }
    }
    // Count uploaded documents
    for (const key in userDocuments) {
      if (userDocuments[key].status === "Uploaded") {
        completedFields++;
      }
    }

    setCompletion(Math.floor((completedFields / totalFields) * 100));
  }, [userData, userDocuments]);

  useEffect(() => {
    calculateCompletion();
  }, [userData, userDocuments, calculateCompletion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDocumentUpload = async (docName, file) => {
    if (!file) return;
    
    try {
      // Validate file
      UserDocumentService.validateFile(file);
      
      // Set uploading state
      setUploading(prev => ({ ...prev, [docName]: true }));
      
      console.log(`Uploading ${docName}:`, file.name);
      
      // Upload to backend
      const result = await UserDocumentService.uploadDocument(file, docName);
      
      // Update document state
      setUserDocuments(prevDocs => ({
        ...prevDocs,
        [docName]: {
          ...prevDocs[docName],
          status: "Uploaded",
          file: file.name,
          document: result.document
        }
      }));
      
      console.log(`${docName} uploaded successfully:`, result);
      
    } catch (error) {
      console.error(`Error uploading ${docName}:`, error);
      setError(`Failed to upload ${docName}: ${error.message}`);
    } finally {
      // Clear uploading state
      setUploading(prev => ({ ...prev, [docName]: false }));
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // Prepare data for backend
      const dataToSave = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        middleName: userData.middleName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        aadhaarNumber: userData.aadhaarNumber,
        panNumber: userData.panNumber,
        currentAddress: userData.currentAddress,
        permanentAddress: userData.permanentAddress,
        genderId: userData.genderId || null,
        maritalStatusId: userData.maritalStatusId || null
      };

      // Call backend service to save/update personal details
      let savedDetails;
      if (personalDetails && personalDetails.userId) {
        // Update existing
        savedDetails = await PersonalDetailsService.updatePersonalDetails(dataToSave);
      } else {
        // Create new
        savedDetails = await PersonalDetailsService.createPersonalDetails(dataToSave);
      }

      // Update state with saved data
      setPersonalDetails(savedDetails);
      setEditMode(false);
      
      // Show success message (you could add a toast notification here)
      console.log("Profile saved successfully!");
      
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReturnToDashboard = () => {
    navigate("/user-dashboard");
    console.log("Returning to dashboard...");
  };

  // Helper function to get proper field labels
  const getFieldLabel = (key) => {
    const labelMap = {
      genderId: "Gender",
      maritalStatusId: "Marital Status",
      firstName: "First Name",
      lastName: "Last Name",
      middleName: "Middle Name",
      phoneNumber: "Phone Number",
      dateOfBirth: "Date of Birth",
      aadhaarNumber: "Aadhaar Number",
      panNumber: "PAN Number",
      currentAddress: "Current Address",
      permanentAddress: "Permanent Address"
    };
    
    return labelMap[key] || key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Helper function to render form field
  const renderFormField = (key) => {
    const isDropdown = key === 'genderId' || key === 'maritalStatusId';
    
    if (isDropdown) {
      const options = key === 'genderId' ? lookupData.genders : lookupData.maritalStatuses;
      const placeholder = key === 'genderId' ? 'Select Gender' : 'Select Marital Status';
      
      return (
        <select
          id={key}
          name={key}
          value={userData[key]}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {key === 'genderId' ? option.genderName : option.statusName}
            </option>
          ))}
        </select>
      );
    }
    
    return (
      <input
        type={key === 'dateOfBirth' ? 'date' : 'text'}
        id={key}
        name={key}
        value={userData[key]}
        onChange={handleInputChange}
        disabled={
          !editMode &&
          (key === "firstName" || key === "lastName" || key === "email")
        }
        className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm sm:text-sm disabled:bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  };

  const renderEditableFields = () => (
    <AnimatePresence>
      <motion.div
        key="editable-fields"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(userData).map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700"
            >
              {getFieldLabel(key)}
            </label>
            {renderFormField(key)}
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Header with Greeting and Progress */}
        <div
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
          style={{
            backgroundImage: `url(https://av.sc.com/corp-en/nr/content/images/our-locations-desktop.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center backdrop-blur-sm justify-between z-5 p-6 bg-black/20 rounded-2xl shadow-xl"
          >
            <div className="flex items-center gap-6">
              <button
                onClick={handleReturnToDashboard}
                className="p-2 text-gray-50 hover:text-gray-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">
                  Hello, {userData.firstName}!
                </h1>
                <p className="text-sm text-gray-300">
                  Let's get your profile up to date.
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-200">Profile Completion</p>
                <CircularProgressBar progress={completion} />
              </div>
            </div>
          </motion.header>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 bg-white rounded-2xl shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5 text-sc-blue-600" />
                Personal Information
              </h2>
            <div className="flex gap-2">
              {editMode && (
                <button
                  onClick={handleSaveChanges}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              )}
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>
            </div>
            {renderEditableFields()}
          </motion.div>

          {/* Document Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-6 bg-white rounded-2xl shadow-xl space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sc-blue-600" />
              Upload Documents
            </h2>
            <p className="text-sm text-gray-600">
              Upload these documents to make future applications faster.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(userDocuments).map((docKey) => {
                const doc = userDocuments[docKey];
                const isUploading = uploading[docKey];
                
                return (
                  <div
                    key={docKey}
                    className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {doc.status === "Uploaded" && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                        {doc.status === "Verified" && (
                          <div className="flex items-center gap-1">
                            <Check className="w-5 h-5 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                          </div>
                        )}
                        {doc.status === "Missing" && (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                        <span className="font-semibold text-gray-800">
                          {doc.name}
                        </span>
                      </div>
                      
                      <label
                        htmlFor={`upload-${docKey}`}
                        className="cursor-pointer"
                      >
                        <input
                          id={`upload-${docKey}`}
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) =>
                            handleDocumentUpload(docKey, e.target.files[0])
                          }
                          disabled={isUploading}
                        />
                        <div className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          isUploading 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-sc-blue-600 hover:bg-sc-blue-700 text-white'
                        }`}>
                          {isUploading ? "Uploading..." : "Upload"}
                        </div>
                      </label>
                    </div>
                    
                    {/* Show file name if uploaded */}
                    {doc.file && (
                      <div className="text-xs text-gray-500 mt-1">
                        File: {doc.file}
                      </div>
                    )}
                    
                    {/* Show upload progress or status */}
                    {isUploading && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-sc-blue-600 h-1 rounded-full animate-pulse w-1/2"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Save Changes Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-end pt-4"
          >
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 text-sm font-medium text-white bg-sc-blue-600 rounded-full shadow-lg hover:bg-sc-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
