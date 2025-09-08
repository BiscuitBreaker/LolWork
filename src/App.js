import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import CustomerLogin from "./CustomerLogin";
import MemberLogin from "./MemberLogin";
import BankingPage from "./BankingPage";
import PersonalDetails from "./PersonalDetails";
import EmploymentDetails from "./EmploymentDetails";
import LoanDetails from "./LoanDetails";
import NomineeDetails from "./NomineeDetails";
import VerificationPage from "./VerificationPage";
import MakerDashboard from "./MakerDashboard";
import CheckerDashboard from "./CheckerDashboard";
import MakerDocumentValidation from "./MakerDocumentValidation";
import MakerDataValidation from "./MakerDataValidation";
import CheckerDocumentValidation from "./CheckerDocumentValidation";
import CheckerDataValidation from "./CheckerDataValidation";
import VerifiedLoansDashboard from "./VerifiedLoansDashboard";
import CustomerProfile from "./CustomerProfile";
import UserDashboard from "./UserDashboard";
import { useEffect } from "react";
import { AnimatePresence } from "motion/react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
    const location = useLocation();
  return (
    
      <AnimatePresence mode="wait">
          <ScrollToTop />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<CustomerLogin />} />
          <Route path="/member" element={<MemberLogin />} />
          <Route path="/banking" element={<BankingPage />} />
          <Route path="/personaldetails" element={<PersonalDetails />} />
          <Route path="/employmentdetails" element={<EmploymentDetails />} />
          <Route path="/loandetails" element={<LoanDetails />} />
          <Route path="/nomineedetails" element={<NomineeDetails />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/maker-dashboard" element={<MakerDashboard />} />
          <Route path="/checker-dashboard" element={<CheckerDashboard />} />
          <Route path="/maker-document-validation" element={<MakerDocumentValidation />} />
          <Route path="/maker-data-validation" element={<MakerDataValidation />} />
          <Route path="/checker-document-validation" element={<CheckerDocumentValidation />} />
          <Route path="/checker-data-validation" element={<CheckerDataValidation />} />
          <Route path="/verified-loans-dashboard" element={<VerifiedLoansDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
        </Routes>
      </AnimatePresence>
    
  );
}

export default App;


