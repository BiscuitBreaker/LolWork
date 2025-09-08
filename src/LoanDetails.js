import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import {
  ArrowRight,
  ArrowLeft,
  Bot,
  FileText,
  Upload,
  CreditCard,
} from "lucide-react";

const LoanDetails = () => {
  const [formData, setFormData] = useState({
    loanType: "",
    requiredLoanAmount: "",
    loanDuration: "",
    hasExistingLoan: "no",
    preferredEmiDate: "",
    attachments: {
      saleAgreement: null,
      ec: null,
      dealerInvoice: null,
      quotation: null,
      admissionLetter: null,
      feeStructure: null,
    },
  });
  const [activeTab, setActiveTab] = useState("loanDetails"); // 'loanDetails' or 'attachments'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, attachmentName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      attachments: {
        ...prevData.attachments,
        [attachmentName]: file,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Loan Details Submitted:", formData);
    // In a real app, you would save this data and navigate to the next step.
  };

  const renderLoanDetails = () => (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-indigo-600" />
        Your Loan Request
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="loanType"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Type
          </label>
          <select
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select Loan Type</option>
            <option value="Home Loan">Home Loan</option>
            <option value="Vehicle Loan">Vehicle Loan</option>
            <option value="Education Loan">Education Loan</option>
            <option value="Personal Loan">Personal Loan</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="requiredLoanAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Required Loan Amount ($)
          </label>
          <input
            type="number"
            id="requiredLoanAmount"
            name="requiredLoanAmount"
            placeholder="e.g., 500000"
            value={formData.requiredLoanAmount}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="loanDuration"
            className="block text-sm font-medium text-gray-700"
          >
            Loan Duration (in years)
          </label>
          <input
            type="number"
            id="loanDuration"
            name="loanDuration"
            placeholder="e.g., 10"
            value={formData.loanDuration}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="preferredEmiDate"
            className="block text-sm font-medium text-gray-700"
          >
            Preferred EMI Date
          </label>
          <select
            id="preferredEmiDate"
            name="preferredEmiDate"
            value={formData.preferredEmiDate}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a date</option>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you have any existing loans?
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <input
              id="existing-loan-yes"
              name="hasExistingLoan"
              type="radio"
              value="yes"
              checked={formData.hasExistingLoan === "yes"}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label
              htmlFor="existing-loan-yes"
              className="ml-2 block text-sm text-gray-900"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="existing-loan-no"
              name="hasExistingLoan"
              type="radio"
              value="no"
              checked={formData.hasExistingLoan === "no"}
              onChange={handleInputChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label
              htmlFor="existing-loan-no"
              className="ml-2 block text-sm text-gray-900"
            >
              No
            </label>
          </div>
        </div>
      </div>
    </section>
  );

  const renderAttachments = () => {
    const { loanType } = formData;
    const requiredAttachments = [];

    if (loanType === "Home Loan") {
      requiredAttachments.push({
        name: "saleAgreement",
        label: "Sale Agreement",
      });
      requiredAttachments.push({
        name: "ec",
        label: "Encumbrance Certificate (EC)",
      });
    } else if (loanType === "Vehicle Loan") {
      requiredAttachments.push({
        name: "dealerInvoice",
        label: "Dealer Invoice",
      });
      requiredAttachments.push({ name: "quotation", label: "Quotation" });
    } else if (loanType === "Education Loan") {
      requiredAttachments.push({
        name: "admissionLetter",
        label: "Admission Letter",
      });
      requiredAttachments.push({
        name: "feeStructure",
        label: "Fee Structure",
      });
    }

    return (
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-indigo-600" />
          Required Attachments
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please upload the documents specific to your loan type.
        </p>

        {requiredAttachments.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-8 bg-gray-50 rounded-md">
            Please select a Loan Type to see required documents.
          </p>
        ) : (
          <div className="space-y-4">
            {requiredAttachments.map((doc, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-md border border-gray-200"
              >
                <label
                  htmlFor={doc.name}
                  className="block text-sm font-medium text-gray-700 sm:w-1/3"
                >
                  {doc.label}
                </label>
                <div className="mt-2 sm:mt-0 sm:w-2/3 flex items-center gap-2">
                  <input
                    type="file"
                    id={doc.name}
                    name={doc.name}
                    onChange={(e) => handleFileChange(e, doc.name)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formData.attachments[doc.name] && (
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formData.attachments[doc.name].name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <ProgressBar currentStep={3} />
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
            Loan Details
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Tell us about the loan you are applying for.
          </p>

          <div className="flex border-b border-gray-200 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("loanDetails")}
              className={`flex-1 py-3 px-1 text-center font-medium text-sm transition-colors duration-200 border-b-2 ${
                activeTab === "loanDetails"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Loan Details
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("attachments")}
              className={`flex-1 py-3 px-1 text-center font-medium text-sm transition-colors duration-200 border-b-2 ${
                activeTab === "attachments"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> Attachments
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[600px]"
              >
                {activeTab === "loanDetails"
                  ? renderLoanDetails()
                  : renderAttachments()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() =>
                  console.log("Navigate back to Employment Details")
                }
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
              <Link
                to="/nomineedetails"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
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
            <p>
              Feel free to ask me any questions you have about the process or
              the documents you need to submit.
            </p>
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

export default LoanDetails;
