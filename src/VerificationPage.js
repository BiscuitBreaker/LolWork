import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Bot,
  FileText,
  User,
  Briefcase,
  CreditCard,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const VerificationPage = () => {
  const [formData, setFormData] = useState({
    personal: {
      firstName: "John",
      middleName: "M",
      lastName: "Doe",
      gender: "male",
      phoneNumber: "123-456-7890",
      emailAddress: "john.doe@example.com",
      maritalStatus: "married",
      aadhaarNumber: "XXXX XXXX XXXX",
      panNumber: "ABCDE1234F",
      currentAddress: "123 Main St, Anytown, USA 12345",
      permanentAddress: "123 Main St, Anytown, USA 12345",
      attachments: {
        photograph: { name: "john_photo.jpg" },
        aadhaarCard: { name: "john_aadhaar.pdf" },
        panCard: { name: "john_pan.pdf" },
        governmentID: { name: "john_license.pdf" },
      },
    },
    employment: {
      occupationType: "Employed",
      employerName: "ABC Corp",
      designation: "Software Engineer",
      annualIncome: "75000",
      workExperience: "5",
      location: "New York",
      officeAddress: "456 Tech Ave, New York, NY 10001",
      attachments: {
        salaryProof: { name: "jan_payslip.pdf" },
        employmentProof: { name: "offer_letter.pdf" },
        itr: { name: "tax_return_2022.pdf" },
        bankStatements: { name: "bank_statement_jun.pdf" },
      },
    },
    loanDetails: {
      loanType: "Home Loan",
      requiredLoanAmount: "500000",
      loanDuration: "20",
      hasExistingLoan: "no",
      preferredEmiDate: "5",
      attachments: {
        saleAgreement: { name: "home_sale_agreement.pdf" },
        ec: { name: "home_ec.pdf" },
      },
    },
    nomineeDetails: {
      nomineeName: "Jane Doe",
      nomineeDOB: "1990-05-15",
      nomineeRelationship: "Spouse",
      nomineeMobileNumber: "987-654-3210",
      nomineeEmailID: "jane.doe@example.com",
      nomineePANNumber: "FGHIJ5678K",
      nomineeAddress: "123 Main St, Anytown, USA 12345",
      attachments: {
        nomineeAadhaar: { name: "jane_aadhaar.pdf" },
        nomineeAddressProof: { name: "jane_address.pdf" },
      },
    },
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [expandedSection, setExpandedSection] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (acceptedTerms) {
      console.log("Application Submitted:", formData);
      navigate("/");
      alert("Your loan application has been successfully submitted!");
    } else {
      alert("Please accept the terms and conditions to submit.");
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSection(expandedSection === sectionName ? null : sectionName);
  };

  // This function would be passed down to the form pages via props in a real app
  const handleEdit = (sectionName) => {
    console.log(`Navigating to edit the ${sectionName} section...`);
    // In a real app, you would use useNavigate here
  };

  const sections = [
    {
      name: "personal",
      title: "Personal Details",
      icon: <User />,
      data: formData.personal,
      attachments: formData.personal.attachments,
      fields: [
        { key: "firstName", label: "First Name" },
        { key: "middleName", label: "Middle Name" },
        { key: "lastName", label: "Last Name" },
        { key: "gender", label: "Gender" },
        { key: "maritalStatus", label: "Marital Status" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "emailAddress", label: "Email Address" },
        { key: "aadhaarNumber", label: "Aadhaar Number" },
        { key: "panNumber", label: "PAN Number" },
        { key: "currentAddress", label: "Current Address" },
        { key: "permanentAddress", label: "Permanent Address" },
      ],
    },
    {
      name: "employment",
      title: "Employment Details",
      icon: <Briefcase />,
      data: formData.employment,
      attachments: formData.employment.attachments,
      fields: [
        { key: "occupationType", label: "Occupation Type" },
        { key: "employerName", label: "Employer/Business Name" },
        { key: "designation", label: "Designation" },
        { key: "annualIncome", label: "Annual Income" },
        { key: "workExperience", label: "Work Experience" },
        { key: "location", label: "Location" },
        { key: "officeAddress", label: "Office/Business Address" },
      ],
    },
    {
      name: "loanDetails",
      title: "Loan Details",
      icon: <CreditCard />,
      data: formData.loanDetails,
      attachments: formData.loanDetails.attachments,
      fields: [
        { key: "loanType", label: "Loan Type" },
        { key: "requiredLoanAmount", label: "Required Loan Amount" },
        { key: "loanDuration", label: "Loan Duration" },
        { key: "hasExistingLoan", label: "Existing Loan" },
        { key: "preferredEmiDate", label: "Preferred EMI Date" },
      ],
    },
    {
      name: "nomineeDetails",
      title: "Nominee Details",
      icon: <Users />,
      data: formData.nomineeDetails,
      attachments: formData.nomineeDetails.attachments,
      fields: [
        { key: "nomineeName", label: "Nominee Name" },
        { key: "nomineeDOB", label: "Nominee DOB" },
        { key: "nomineeRelationship", label: "Relationship" },
        { key: "nomineeMobileNumber", label: "Mobile Number" },
        { key: "nomineeEmailID", label: "Email ID" },
        { key: "nomineePANNumber", label: "PAN Number" },
        { key: "nomineeAddress", label: "Nominee Address" },
      ],
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-200 transition-colors transform hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="flex flex-col max-w-[88rem] md:flex-row w-full gap-8 items-start">
        {/* Main form container */}
        <div className="w-full md:w-3/4 bg-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Final Verification
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Please review all the details before submitting your application.
          </p>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div
                  className="flex justify-between items-center cursor-pointer p-2 -mx-2 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => toggleSection(section.name)}
                >
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    {section.icon} {section.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(section.name);
                      }}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                    {expandedSection === section.name ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {expandedSection === section.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4 pl-4 border-l-2 border-gray-100"
                    >
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
                        {section.fields.map((field) => (
                          <div key={field.key} className="flex flex-col">
                            <dt className="font-medium text-gray-900">
                              {field.label}:
                            </dt>
                            <dd className="mt-1">
                              {section.data[field.key] || "N/A"}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <div
              className="flex justify-between items-center cursor-pointer p-2 -mx-2 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => toggleSection("attachments")}
            >
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" /> Uploaded
                Documents
              </h2>
              {expandedSection === "attachments" ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <AnimatePresence>
              {expandedSection === "attachments" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pl-4 border-l-2 border-gray-100"
                >
                  <ul className="space-y-2 text-sm text-gray-600">
                    {sections.flatMap((section) =>
                      Object.keys(section.attachments).map((key) => {
                        const file = section.attachments[key];
                        return (
                          <li
                            key={`${section.name}-${key}`}
                            className="flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-900">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                              :
                            </span>
                            <span className="text-gray-600">
                              {file ? file.name : "Not Uploaded"}
                            </span>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="flex items-center">
              <input
                id="legal-declaration"
                name="legal-declaration"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="legal-declaration"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that all the information provided is correct to the
                best of my knowledge.
              </label>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => console.log("Navigate back to Nominee Details")}
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
              <button
                type="submit"
                disabled={!acceptedTerms}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400"
              >
                Submit Application
                <Check className="h-4 w-4 ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Floating Chatbot Companion */}
        <div className="hidden md:block md:w-2/5 h-[80vh] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 overflow-y-auto sticky top-4">
          <div className="flex items-center gap-3 text-indigo-600 mb-4 border-b pb-4">
            <Bot className="w-6 h-6" />
            <h3 className="text-lg font-bold">Your Loan Companion</h3>
          </div>
          <div className="text-gray-700 space-y-4">
            <p>Hi there! I'm here to help you with your loan application.</p>
            <p>Feel free to ask me any questions you have before you submit.</p>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm">
                This is a placeholder for a live chatbot interface.
              </p>
              <p className="text-sm mt-2 text-indigo-800">
                Possible functionality: Answer FAQs, guide through form fields,
                check loan eligibility in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
