import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutList,
  Grip,
  ArrowUp,
  ArrowDown,
  LogOut,
} from "lucide-react";
import { WorkflowService } from "./Service/WorkflowService";
import { logout, getCurrentUser } from "./Service/AuthService";

const checkerPalette = {
  bg: "bg-sc-green-50",
  accent: "text-sc-green-600",
  button: "bg-sc-green-600 hover:bg-sc-green-700 focus:ring-sc-green-500",
  card: "bg-sc-green-100",
  borderColor: "border-sc-green-200",
};

const CheckerDashboard = () => {
  const [view, setView] = useState("card"); // 'card' or 'table'
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const palette = checkerPalette;

  // Load user info and pending applications on component mount
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    loadPendingApplications();
  }, []);

  const loadPendingApplications = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await WorkflowService.getCheckerPendingApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error loading pending applications:", error);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Alias for retry functionality
  const fetchApplications = loadPendingApplications;

  const handleLogout = () => {
    logout();
    navigate("/member-login");
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ArrowUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="w-3 h-3" />
    ) : (
      <ArrowDown className="w-3 h-3" />
    );
  };

  const sortedApplications = React.useMemo(() => {
    if (!sortConfig.key) return applications;

    return [...applications].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle special cases for sorting
      if (sortConfig.key === "createdAt") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortConfig.key === "amount") {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [applications, sortConfig]);

  const renderCardView = (applications) => (
    <div className="space-y-4">
      {applications.map((app) => (
        <div
          key={app.applicationId}
          className={`p-4 rounded-lg shadow-sm border ${
            palette.borderColor
          } flex flex-col sm:flex-row items-center justify-between transition-colors duration-300 ${
            palette.card
          }`}
        >
          <div className="flex flex-col text-sm text-gray-700 text-center sm:text-left">
            <span className="font-semibold">APP-{app.applicationId}</span>
            <span className="text-xs text-gray-500">
              Applied on: {new Date(app.createdAt).toLocaleDateString()}
            </span>
            <span className="text-xs text-gray-500">Status: {app.status}</span>
            <span className="text-xs text-gray-500">Type: {app.loanType || 'Not specified'}</span>
            {app.amount && (
              <span className="text-xs text-gray-500">
                Amount: ${app.amount.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={() => navigate("/checker-document-validation", { 
              state: { applicationId: app.applicationId } 
            })}
            className={`mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${palette.button} flex items-center gap-2`}
          >
            Start Verification <ArrowRight className="w-4 h-4"/>
          </button>
        </div>
      ))}
    </div>
  );

  const renderTableView = (applications) => (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => requestSort("applicationId")}
            >
              <div className="flex items-center">
                Application ID {getSortIcon("applicationId")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => requestSort("loanType")}
            >
              <div className="flex items-center">
                Loan Type {getSortIcon("loanType")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => requestSort("amount")}
            >
              <div className="flex items-center">
                Loan Amount {getSortIcon("amount")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => requestSort("createdAt")}
            >
              <div className="flex items-center">
                Applied On {getSortIcon("createdAt")}
              </div>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => requestSort("status")}
            >
              <div className="flex items-center">
                Status {getSortIcon("status")}
              </div>
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.applicationId} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{application.applicationId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {application.loanType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${application.amount?.toLocaleString() || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  application.status === 'MAKER_APPROVED' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {application.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => navigate("/checker-document-validation", { 
                    state: { applicationId: application.applicationId } 
                  })}
                  className={`text-white px-4 py-2 rounded-lg text-xs ${palette.button} flex items-center gap-2 hover:opacity-90 transition-opacity`}
                >
                  Start Verification
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <motion.div
      className={`min-h-screen font-sans transition-colors duration-500 ${palette.bg} p-8`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
              {/* Profile picture placeholder */}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Hello, {currentUser?.username || 'User'}
              </h1>
              <p className="text-sm text-gray-500">Checker Dashboard - Verify reviewed applications</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
            <div className="px-4 py-2 bg-sc-green-600 text-white rounded-full text-sm font-medium shadow-sm">
              Checker
            </div>
          </div>
        </header>

        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setView("card")}
              className={`p-2 rounded-full transition-colors duration-200 ${
                view === "card"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <Grip className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView("table")}
              className={`p-2 rounded-full transition-colors duration-200 ${
                view === "table"
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <h2 className={`text-xl font-bold ${palette.accent}`}>
            Checker Tasks: Ready for Verification
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sc-green-600"></div>
              <p className="mt-2 text-gray-500">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
              <button 
                onClick={fetchApplications}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : applications.length > 0 ? (
            view === "card" ? (
              renderCardView(sortedApplications)
            ) : (
              renderTableView(sortedApplications)
            )
          ) : (
            <p className="text-gray-500 text-center py-8">
              No applications awaiting verification.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CheckerDashboard;
