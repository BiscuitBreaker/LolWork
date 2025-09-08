import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  'Personal Details',
  'Employment Details',
  'Loan Details',
  'Nominee Details',
];

const ProgressBar = ({ currentStep }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <motion.div
        className="flex justify-center items-center space-x-2 md:space-x-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <React.Fragment key={step}>
              <motion.span
                variants={itemVariants}
                className={`
                  text-sm md:text-base font-medium whitespace-nowrap
                  transition-colors duration-300
                  ${isActive ? 'text-indigo-600 font-bold' : ''}
                  ${isCompleted ? 'text-indigo-400 opacity-60' : ''}
                  ${!isActive && !isCompleted ? 'text-gray-400' : ''}
                `}
              >
                {step}
              </motion.span>
              {index < steps.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ProgressBar;
