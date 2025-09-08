import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  LayoutList,
  Grip,
  ArrowUp,
  ArrowDown,
  LogOut,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { WorkflowService } from "./Service/WorkflowService";
import { logout, getCurrentUser } from "./Service/AuthService";

const makerPalette = {
  bg: "bg-sc-blue-50",
  accent: "text-sc-blue-600",
  button: "bg-sc-blue-600 hover:bg-sc-blue-700 focus:ring-sc-blue-500",
  card: "bg-sc-blue-100",
  borderColor: "border-sc-blue-200",
};

const MakerDashboard = () => {
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
      const data = await WorkflowService.getMakerPendingApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error loading applications:", error);
      setError("Failed to load pending applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const palette = makerPalette;

  const  sortedApplications = React.useMemo(() => {
    const apps = [...applications];
    if (sortConfig.key !== null) {
      apps.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return apps;
  }, [applications, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="w-4 h-4 ml-2" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-2" />
    );
  };

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
          <Link 
            to={`/maker-document-validation?applicationId=${app.applicationId}`}
            className={`mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${palette.button} flex items-center gap-2`}
          >
            Start Review <ArrowRight className="w-4 h-4"/>
          </Link>
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
          {applications.map((app) => (
            <tr key={app.applicationId}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                APP-{app.applicationId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {app.loanType || 'Not specified'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {app.amount ? `$${app.amount.toLocaleString()}` : 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(app.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {app.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => navigate(`/maker-document-validation?applicationId=${app.applicationId}`)}
                  className={`text-white px-4 py-2 rounded-lg text-xs ${palette.button} flex items-center gap-2`}
                >
                  Start Review
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
              <p className="text-sm text-gray-500">Maker Dashboard - Review new applications</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadPendingApplications}
              className="flex items-center gap-2 px-3 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="px-4 py-2 bg-sc-blue-600 text-white rounded-full text-sm font-medium shadow-sm">
              Maker
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
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
            Maker Tasks: New Applications
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <RefreshCw className="w-8 h-8 animate-spin text-sc-blue-600" />
              <span className="ml-2 text-sc-blue-600">Loading applications...</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-32 text-red-600">
              <AlertCircle className="w-8 h-8 mb-2" />
              <span>{error}</span>
              <button 
                onClick={loadPendingApplications}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
              No new applications to review.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MakerDashboard;
