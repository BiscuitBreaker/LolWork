import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, CheckCircle, User, Award, ArrowRight, Info, LayoutList, Grip, FileText } from 'lucide-react';

const finalPalette = {
  bg: 'bg-amber-50',
  accent: 'text-amber-600',
  button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
  card: 'bg-amber-100',
  borderColor: 'border-amber-200'
};

const verifiedTasks = [
  { id: 'APP004', applicantName: 'Jane Doe', loanType: 'Personal Loan', approvalDate: '2024-08-11', status: 'Approved' },
  { id: 'APP005', applicantName: 'John Smith', loanType: 'Home Loan', approvalDate: '2024-08-11', status: 'Approved' },
  { id: 'APP001', applicantName: 'Bob Johnson', loanType: 'Education Loan', approvalDate: '2024-08-10', status: 'Approved' },
];

const VerifiedLoansDashboard = () => {
  const [view, setView] = useState('card'); // 'card' or 'table'
  const palette = finalPalette;

  const renderCardView = (tasks) => (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className={`p-4 rounded-lg shadow-sm border ${palette.borderColor} flex flex-col sm:flex-row items-center justify-between transition-colors duration-300 ${palette.card}`}>
          <div className="flex flex-col text-sm text-gray-700 text-center sm:text-left">
            <span className="font-semibold">{task.id} - {task.applicantName}</span>
            <span className="text-xs text-gray-500">Loan Type: {task.loanType}</span>
            <span className="text-xs text-gray-500">Approved On: {task.approvalDate}</span>
          </div>
          <button
            onClick={() => console.log(`Viewing final details for ${task.id}`)}
            className={`mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 ${palette.button} flex items-center gap-2`}
          >
            View Final Details <FileText className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );

  const renderTableView = (tasks) => (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Application ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Loan Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Approved On
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.applicantName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.loanType}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.approvalDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => console.log(`Viewing final details for ${task.id}`)}
                  className={`text-white px-4 py-2 rounded-lg text-xs ${palette.button} flex items-center gap-2`}
                >
                  View Final Details
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
    >
      <div className="w-full max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0">
              {/* Profile picture placeholder */}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hello, John Doe</h1>
              <p className="text-sm text-gray-500">Welcome to the dashboard.</p>
            </div>
          </div>
        </header>

        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${palette.accent}`}>Completed Tasks: Finalized Loans</h2>
          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setView('card')}
              className={`p-2 rounded-full transition-colors duration-200 ${view === 'card' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <Grip className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 rounded-full transition-colors duration-200 ${view === 'table' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:bg-gray-100'}`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {verifiedTasks.length > 0 ? (
              view === 'card' ? renderCardView(verifiedTasks) : renderTableView(verifiedTasks)
            ) : (
              <p className="text-gray-500 text-center py-8">No completed tasks to display.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VerifiedLoansDashboard;