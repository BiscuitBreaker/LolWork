import React, { useState } from "react";
import {
  ArrowLeft,
  X,
  Eye,
  Users,
  Briefcase,
  CreditCard,
  Check,
  PanelLeft,
  PanelTop,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkflowService } from './Service/WorkflowService';

const mockApplication = {
  id: "APP001",
  applicantName: "John Doe",
  loanType: "Home Loan",
  documents: [
    {
      name: "Photograph",
      file: {
        name: "john_photo.jpg",
        url: "https://placehold.co/800x600/C7D2FE/312E81?text=Photograph",
      },
      status: "valid",
      remark: "",
    },
    {
      name: "Aadhaar Card",
      file: {
        name: "john_aadhaar.pdf",
        url: "https://placehold.co/800x600/A5B4FC/4338CA?text=Aadhaar+Card",
      },
      status: "valid",
      remark: "",
    },
    {
      name: "PAN Card",
      file: {
        name: "john_pan.pdf",
        url: "https://placehold.co/800x600/C4B5FD/5B21B6?text=PAN+Card",
      },
      status: "valid",
      remark: "",
    },
    {
      name: "Salary Proof",
      file: {
        name: "john_payslip.pdf",
        url: "https://placehold.co/800x600/FBCFE8/831843?text=Salary+Proof",
      },
      status: "review",
      remark:
        "Blurry, but readable. Need to verify against bank statement later.",
    },
  ],
  personal: {
    firstName: "John",
    middleName: "M",
    lastName: "Doe",
    emailAddress: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    aadhaarNumber: "XXXX XXXX XXXX",
    panNumber: "ABCDE1234F",
  },
  employment: {
    employerName: "ABC Corp",
    annualIncome: "75000",
    workExperience: "5",
  },
  loanDetails: {
    loanType: "Home Loan",
    requiredLoanAmount: "500000",
    loanDuration: "20",
  },
  makerRemarks:
    "The salary proof document was blurry but was verified with the bank statements from the previous step. Ready for final check.",
};

const CheckerDataValidation = () => {
  const [activeTabs, setActiveTabs] = useState([]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isDataPanelVisible, setIsDataPanelVisible] = useState(true);
  const [isDataPanelHovered, setIsDataPanelHovered] = useState(false);
  const [stackingLayout, setStackingLayout] = useState("horizontal");
  const [dataStatus] = useState({
    firstName: "verified",
    middleName: "verified",
    lastName: "verified",
    emailAddress: "verified",
    phoneNumber: "verified",
    aadhaarNumber: "verified",
    panNumber: "verified",
    employerName: "verified",
    annualIncome: "verified",
    workExperience: "verified",
    loanType: "verified",
    requiredLoanAmount: "verified",
    loanDuration: "verified",
  });
  const [checkerRemarks, setCheckerRemarks] = useState("");

  const openDocument = (doc) => {
    if (!activeTabs.find((tab) => tab.name === doc.name)) {
      if (activeTabs.length >= 2) {
        setActiveTabs((prev) => [...prev.slice(1), doc]);
      } else {
        setActiveTabs((prev) => [...prev, doc]);
      }
    }
    setIsSidebarHovered(false);
  };

  const closeTab = (docName) => {
    setActiveTabs(activeTabs.filter((tab) => tab.name !== docName));
  };

  const handleCheckerRemarkChange = (e) => {
    setCheckerRemarks(e.target.value);
  };

  const renderDataSection = (title, icon, data, fields) => (
    <section className="mb-6 pb-4 border-b border-white/20">
      <h2 className="text-lg font-semibold text-sc-green-700 flex items-center gap-3 mb-4 px-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-sc-green-100 to-sc-blue-100">
          {icon}
        </div>
        {title}
      </h2>
      <div className="space-y-3">
        {fields.map((field) => (
          <div
            key={field.key}
            className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/80 transition-all duration-200"
          >
            <span className="text-sm font-medium text-gray-700">
              {field.label}:
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-800 font-medium bg-gray-50/80 px-3 py-1 rounded-lg">{data[field.key]}</span>
              {dataStatus[field.key] === "verified" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-sc-green-500 to-sc-green-600 text-white shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
              {dataStatus[field.key] === "mismatch" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
                  <X className="w-4 h-4" />
                </div>
              )}
              {dataStatus[field.key] === "unchecked" && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-400">
                  <span className="text-xs">?</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  // Updated width calculations for functionality-focused layout
  const sidebarWidth = 'md:w-1/5'; // 20% for document sidebar
  const dataPanelWidth = "md:w-2/5"; // 40% for data panel (always visible)

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-sc-green-50">

      <div className="relative z-10 min-h-screen">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 pointer-events-none">
          {/* Center Title */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-sc-green-600 to-sc-green-700 text-white px-3 py-1 rounded-full shadow-lg backdrop-blur-md border border-white/20 pointer-events-auto">
            <Briefcase className="w-4 h-4" />
            Checker
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
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-green-600 to-sc-blue-600 bg-clip-text text-transparent">Data Review</h3>
            {(isDataPanelVisible || isDataPanelHovered) && (
              <div className="flex items-center gap-2">
                {/* Back Button */}
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center gap-1 text-sc-green-500 hover:text-sc-green-700 transition-colors p-1 hover:bg-white/50 rounded-lg"
                  title="Go Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-xs font-medium">Return To Document Review
                  </span>
                </button>
                {/* Hide Panel Button */}
                <button 
                  onClick={() => setIsDataPanelVisible(false)} 
                  className="text-sc-green-500 hover:text-sc-green-700 transition-colors p-1 hover:bg-white/50 rounded-lg"
                  title="Hide Data Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <div className="h-[calc(100vh-100px)] overflow-y-auto px-6 py-4">
            {renderDataSection(
              "Personal Details",
              <Users className="w-5 h-5 text-teal-600" />,
              mockApplication.personal,
              [
                { key: "firstName", label: "First Name" },
                { key: "middleName", label: "Middle Name" },
                { key: "lastName", label: "Last Name" },
                { key: "emailAddress", label: "Email Address" },
                { key: "phoneNumber", label: "Phone Number" },
                { key: "aadhaarNumber", label: "Aadhaar Number" },
                { key: "panNumber", label: "PAN Number" },
              ]
            )}
            {renderDataSection(
              "Employment Details",
              <Briefcase className="w-5 h-5 text-teal-600" />,
              mockApplication.employment,
              [
                { key: "employerName", label: "Employer Name" },
                { key: "annualIncome", label: "Annual Income" },
                { key: "workExperience", label: "Work Experience" },
              ]
            )}
            {renderDataSection(
              "Loan Details",
              <CreditCard className="w-5 h-5 text-teal-600" />,
              mockApplication.loanDetails,
              [
                { key: "loanType", label: "Loan Type" },
                { key: "requiredLoanAmount", label: "Required Loan Amount" },
                { key: "loanDuration", label: "Loan Duration" },
              ]
            )}

            <div className="mt-8 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
              <h4 className="text-sm font-semibold text-sc-green-700 mb-3">
                Maker's Final Remarks:
              </h4>
              <p className="text-sm text-gray-800 bg-gray-50/80 p-4 rounded-lg border border-gray-200/50">
                {mockApplication.makerRemarks || "No remarks provided."}
              </p>
            </div>

            <div className="mt-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-white/30">
              <label
                htmlFor="checker-remarks"
                className="block text-sm font-semibold text-sc-green-700 mb-3"
              >
                Checker's Final Remarks
              </label>
              <textarea
                id="checker-remarks"
                name="checker-remarks"
                rows="4"
                value={checkerRemarks}
                onChange={handleCheckerRemarkChange}
                placeholder="Add your final comments here for record or future reference..."
                className="w-full p-4 rounded-xl border border-white/30 bg-white/80 backdrop-blur-sm shadow-sm focus:border-sc-green-500 focus:ring-2 focus:ring-sc-green-500/20 focus:outline-none sm:text-sm transition-all duration-200 resize-none"
              ></textarea>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={() => console.log('Return to Maker')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-200 bg-white/80 backdrop-blur-sm text-red-700 font-medium shadow-sm hover:bg-red-50 hover:border-red-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-200"
              >
                Return to Maker
              </button>
              <button
                onClick={async () => {
                  try {
                    await WorkflowService.processCheckerApplication('APP001', 'APPROVE', '');
                    alert('Application marked as verified and completed!');
                  } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to verify application');
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sc-green-600 to-sc-green-700 text-white font-medium shadow-lg hover:from-sc-green-700 hover:to-sc-green-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sc-green-500/20 transition-all duration-200 transform hover:scale-105"
              >
                <Check className="h-4 w-4" />
                Mark As Verified
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
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-green-600 to-sc-blue-600 bg-clip-text text-transparent">Document Viewer</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStackingLayout("horizontal")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  stackingLayout === "horizontal"
                    ? "bg-gradient-to-r from-sc-green-500 to-sc-green-600 text-white shadow-lg"
                    : "text-sc-green-600 hover:bg-sc-green-50 bg-white/70 border border-sc-green-200"
                }`}
              >
                <PanelLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStackingLayout("vertical")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  stackingLayout === "vertical"
                    ? "bg-gradient-to-r from-sc-green-500 to-sc-green-600 text-white shadow-lg"
                    : "text-sc-green-600 hover:bg-sc-green-50 bg-white/70 border border-sc-green-200"
                }`}
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
                  className="text-center text-sc-green-600 flex flex-col items-center justify-center h-full"
                >
                  <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 mb-6">
                    <Eye className="w-16 h-16 mx-auto mb-4 text-sc-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Ready to Review</h4>
                  <p className="text-sm text-gray-600 max-w-md">
                    Hover on the sidebars to access documents for validation or verify applicant data.
                  </p>
                </motion.div>
              ) : (
                <div className={`w-full h-full flex gap-4 ${stackingLayout === "horizontal" ? "flex-row" : "flex-col"}`}>
                  {activeTabs.map((tab) => (
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
          <div className="flex items-center justify-between p-6 pb-4 border-b border-white/30">
            <h3 className="text-xl font-bold bg-gradient-to-r from-sc-blue-600 to-sc-green-600 bg-clip-text text-transparent">Documents</h3>
            <button onClick={() => setIsSidebarHovered(false)} className="text-sc-blue-500 hover:text-sc-blue-700 transition-colors p-1 hover:bg-white/50 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="h-[calc(100vh-100px)] overflow-y-auto px-6 py-4 space-y-3">
            {mockApplication.documents.map((doc, index) => (
              <li
                key={doc.name}
                className={`p-4 bg-white/60 backdrop-blur-sm rounded-xl cursor-pointer border border-white/30 transition-all duration-200 hover:bg-white/80 hover:shadow-lg hover:scale-105 ${
                  activeTabs.find(tab => tab.name === doc.name) ? 'ring-2 ring-sc-green-500 bg-sc-green-50/80' : ''
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

export default CheckerDataValidation;
