import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X, Eye, Users, Briefcase, CreditCard, Check, PanelLeft, PanelTop } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { WorkflowService } from './Service/WorkflowService';

const mockApplication = {
  id: 'APP001',
  applicantName: 'John Doe',
  loanType: 'Home Loan',
  documents: [
    { name: 'Photograph', file: { name: 'john_photo.jpg', url: 'https://placehold.co/800x600/C7D2FE/312E81?text=Photograph' }, status: 'valid', remark: '' },
    { name: 'Aadhaar Card', file: { name: 'john_aadhaar.pdf', url: 'https://placehold.co/800x600/A5B4FC/4338CA?text=Aadhaar+Card' }, status: 'valid', remark: '' },
    { name: 'PAN Card', file: { name: 'john_pan.pdf', url: 'https://placehold.co/800x600/C4B5FD/5B21B6?text=PAN+Card' }, status: 'valid', remark: '' },
    { name: 'Salary Proof', file: { name: 'john_payslip.pdf', url: 'https://placehold.co/800x600/FBCFE8/831843?text=Salary+Proof' }, status: 'review', remark: 'Blurry, but readable. Need to verify against bank statement later.' },
  ],
  personal: {
    firstName: 'John',
    middleName: 'M',
    lastName: 'Doe',
    emailAddress: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    aadhaarNumber: 'XXXX XXXX XXXX',
    panNumber: 'ABCDE1234F',
  },
  employment: {
    employerName: 'ABC Corp',
    annualIncome: '75000',
    workExperience: '5',
  },
  loanDetails: {
    loanType: 'Home Loan',
    requiredLoanAmount: '500000',
    loanDuration: '20',
  },
  makerRemarks: '',
};

const MakerDataValidation = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isDataPanelVisible, setIsDataPanelVisible] = useState(true);
  const [isDataPanelHovered, setIsDataPanelHovered] = useState(false);
  const [stackingLayout, setStackingLayout] = useState('horizontal');
  const [dataStatus, setDataStatus] = useState({
    firstName: 'unchecked', middleName: 'unchecked', lastName: 'unchecked', emailAddress: 'unchecked',
    phoneNumber: 'unchecked', aadhaarNumber: 'unchecked', panNumber: 'unchecked', employerName: 'unchecked',
    annualIncome: 'unchecked', workExperience: 'unchecked', loanType: 'unchecked', requiredLoanAmount: 'unchecked',
    loanDuration: 'unchecked',
  });

  const openDocument = (doc) => {
    if (!activeTabs.find(tab => tab.name === doc.name)) {
      if (activeTabs.length >= 2) {
        setActiveTabs(prev => [...prev.slice(1), doc]);
      } else {
        setActiveTabs(prev => [...prev, doc]);
      }
    }
    setIsSidebarHovered(false);
  };

  const closeTab = (docName) => {
    setActiveTabs(activeTabs.filter(tab => tab.name !== docName));
  };
  
  const handleDataStatusChange = (key, status) => {
    setDataStatus(prevStatus => ({ ...prevStatus, [key]: status }));
  };

  const renderDataSection = (title, icon, data, fields) => (
    <section className="mb-6 pb-4 border-b border-white/20">
      <h2 className="text-lg font-semibold text-sc-blue-700 flex items-center gap-3 mb-4 px-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-sc-blue-100 to-sc-green-100">
          {icon}
        </div>
        {title}
      </h2>
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.key} className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-200">
            <span className="text-sm font-medium text-gray-700">{field.label}:</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-800 font-medium bg-gray-50/80 px-3 py-1 rounded-lg">{data[field.key]}</span>
              <button
                onClick={() => handleDataStatusChange(field.key, 'verified')}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${dataStatus[field.key] === 'verified' ? 'bg-gradient-to-r from-sc-green-500 to-sc-green-600 text-white shadow-lg scale-110' : 'bg-white/70 text-sc-green-600 hover:bg-sc-green-50 hover:text-sc-green-700 border border-sc-green-200'}`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDataStatusChange(field.key, 'mismatch')}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${dataStatus[field.key] === 'mismatch' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg scale-110' : 'bg-white/70 text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
  
  // Updated width calculations for functionality-focused layout
  const sidebarWidth = 'md:w-1/5'; // 20% for document sidebar
  const dataPanelWidth = 'md:w-2/5'; // 40% for data panel (always visible)

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-sc-blue-50">

      <div className="relative z-10 min-h-screen">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 pointer-events-none">
          {/* Center Title */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-sc-blue-600 to-sc-blue-700 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/20 pointer-events-auto">
            <Briefcase className="w-4 h-4" />
            Maker
          </div>
        </div>

        {/* Main Content Container */}
        <div className="flex items-center justify-center p-6 pt-24 min-h-screen">
          <div className="relative h-[85vh] w-full max-w-[88rem] flex items-center">

        {/* Data Sidebar (Left) - With Hide/Show Functionality */}
        <div
          className={`fixed top-0 left-0 h-full bg-white/90 backdrop-blur-xl z-40 shadow-2xl transition-all duration-300 ease-out ${dataPanelWidth} flex-shrink-0 border-r border-white/30 ${
            isDataPanelVisible || isDataPanelHovered ? 'translate-x-0' : '-translate-x-[85%]'
          }`}
          onMouseEnter={() => {
            setIsDataPanelHovered(true);
            if (!isDataPanelVisible) setIsDataPanelVisible(true);
          }}
          onMouseLeave={() => setIsDataPanelHovered(false)}
        >
          <div className="flex items-center justify-between p-6 pb-4 border-b border-white/30">
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-blue-600 to-sc-green-600 bg-clip-text text-transparent">Data Validation</h3>
            {(isDataPanelVisible || isDataPanelHovered) && (
              <div className="flex items-center gap-2">
                {/* Back Button */}
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center gap-1 text-sc-blue-500 hover:text-sc-blue-700 transition-colors p-1 hover:bg-white/50 rounded-lg"
                  title="Go Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-xs font-medium">Return to Document Validation</span>
                </button>
                {/* Hide Panel Button */}
                <button 
                  onClick={() => setIsDataPanelVisible(false)} 
                  className="text-sc-blue-500 hover:text-sc-blue-700 transition-colors p-1 hover:bg-white/50 rounded-lg"
                  title="Hide Data Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="h-[calc(100vh-100px)] overflow-y-auto px-6 py-4">
            {renderDataSection('Personal Details', <Users className="w-5 h-5 text-blue-600" />, mockApplication.personal, [
              { key: 'firstName', label: 'First Name' }, { key: 'middleName', label: 'Middle Name' }, { key: 'lastName', label: 'Last Name' },
              { key: 'emailAddress', label: 'Email Address' }, { key: 'phoneNumber', label: 'Phone Number' },
              { key: 'aadhaarNumber', label: 'Aadhaar Number' }, { key: 'panNumber', label: 'PAN Number' },
            ])}
            {renderDataSection('Employment Details', <Briefcase className="w-5 h-5 text-blue-600" />, mockApplication.employment, [
              { key: 'employerName', label: 'Employer Name' }, { key: 'annualIncome', label: 'Annual Income' }, { key: 'workExperience', label: 'Work Experience' },
            ])}
            {renderDataSection('Loan Details', <CreditCard className="w-5 h-5 text-blue-600" />, mockApplication.loanDetails, [
              { key: 'loanType', label: 'Loan Type' }, { key: 'requiredLoanAmount', label: 'Required Loan Amount' }, { key: 'loanDuration', label: 'Loan Duration' },
            ])}
            <div className="mt-8 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
              <label htmlFor="maker-remarks" className="block text-sm font-semibold text-sc-blue-700 mb-3">Maker's Final Remarks</label>
              <textarea
                id="maker-remarks"
                name="maker-remarks"
                rows="4"
                value={mockApplication.makerRemarks}
                placeholder="Add your final remarks for the Checker..."
                className="w-full p-4 rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm shadow-sm focus:border-sc-blue-500 focus:ring-2 focus:ring-sc-blue-500/20 focus:outline-none sm:text-sm transition-all duration-200 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-between gap-4 mt-6">
              <button onClick={() => console.log('Return')} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-200 bg-white/80 backdrop-blur-sm text-red-700 font-medium shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200">
                <ArrowLeft className="h-4 w-4" />
                Return to Applicant
              </button>
              <button onClick={async () => {
                try {
                  await WorkflowService.processMakerApplication('APP001', 'APPROVE', '');
                  alert('Application forwarded to checker!');
                } catch (error) {
                  console.error('Error:', error);
                  alert('Failed to forward application');
                }
              }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sc-blue-600 to-sc-blue-700 text-white font-medium shadow-lg hover:from-sc-blue-700 hover:to-sc-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sc-blue-500/20 transition-all duration-200 transform hover:scale-105">
                Forward to Checker
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Document Viewer (Central Column) */}
        <div className={`w-full h-[85vh] bg-white/85 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/30 overflow-y-auto sticky top-4 transition-all duration-300 ease-out mx-auto ${
          (isDataPanelVisible || isDataPanelHovered) ? 'ml-[40%]' : 'ml-[6%]'
        } ${
          isSidebarHovered ? 'mr-[20%]' : 'mr-0'
        }`}>
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/30">
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-blue-600 to-sc-green-600 bg-clip-text text-transparent">Document Viewer</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStackingLayout('horizontal')}
                className={`p-3 rounded-xl transition-all duration-200 ${stackingLayout === 'horizontal' ? 'bg-gradient-to-r from-sc-blue-500 to-sc-blue-600 text-white shadow-lg' : 'text-sc-blue-600 hover:bg-sc-blue-50 bg-white/70 border border-sc-blue-200'}`}
              >
                <PanelLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStackingLayout('vertical')}
                className={`p-3 rounded-xl transition-all duration-200 ${stackingLayout === 'vertical' ? 'bg-gradient-to-r from-sc-blue-500 to-sc-blue-600 text-white shadow-lg' : 'text-sc-blue-600 hover:bg-sc-blue-50 bg-white/70 border border-sc-blue-200'}`}
              >
                <PanelTop className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-grow bg-gradient-to-br from-gray-50/50 to-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden h-[85%] p-4 border border-white/20">
            <AnimatePresence>
              {activeTabs.length === 0 ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center text-sc-blue-600 flex flex-col items-center justify-center h-full"
                >
                  <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 mb-6">
                    <Eye className="w-16 h-16 mx-auto mb-4 text-sc-blue-500" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Ready to Review</h4>
                  <p className="text-sm text-gray-600 max-w-md">Hover on the sidebars to access documents for validation or verify applicant data.</p>
                </motion.div>
              ) : (
                <div className={`w-full h-full flex gap-4 ${stackingLayout === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
                  {activeTabs.map(tab => (
                    <motion.div 
                      key={tab.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative flex-1 bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/30"
                    >
                      <button 
                        onClick={() => closeTab(tab.name)} 
                        className="absolute top-3 right-3 p-2 rounded-full bg-red-500/90 backdrop-blur-sm text-white hover:bg-red-600 z-10 transition-all duration-200 shadow-lg hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={tab.file.url}
                        alt={tab.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Document Sidebar (Right) */}
        <div
          className={`fixed top-0 right-0 h-full bg-white/90 backdrop-blur-xl z-40 shadow-2xl transition-all duration-300 ease-out ${sidebarWidth} flex-shrink-0 border-l border-white/30 ${isSidebarHovered ? 'translate-x-0' : 'translate-x-[80%]'}`}
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
        >
          <div className="flex items-center justify-between p-6 pb-4 border-b border-white/30 ">
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-green-600 to-sc-blue-600 bg-clip-text text-transparent">Documents</h3>
            <button onClick={() => setIsSidebarHovered(false)} className="text-sc-green-500 hover:text-sc-green-700 transition-colors p-1 hover:bg-white/50 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="h-[calc(100vh-100px)] overflow-y-auto px-6 py-4 space-y-3">
            {mockApplication.documents.map((doc, index) => (
              <li 
                key={doc.name} 
                className={`p-4 bg-white/60 backdrop-blur-sm rounded-xl cursor-pointer border border-white/30 transition-all duration-200 hover:bg-white/80 hover:shadow-lg hover:scale-105 ${
                  activeTabs.find(tab => tab.name === doc.name) ? 'ring-2 ring-sc-blue-500 bg-sc-blue-50/80' : ''
                }`}
                onClick={() => openDocument(doc)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${doc.status === 'valid' ? 'bg-sc-green-500' : 'bg-orange-400'}`}></div>
                  <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                </div>
                {doc.remark && (
                  <p className="text-xs text-gray-600 mt-2 pl-6">{doc.remark}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakerDataValidation;
