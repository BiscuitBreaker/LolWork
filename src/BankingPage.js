import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Calculator, FileText, Phone, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const loanOptions = [
  {
    title: "Personal Loan",
    description: "A flexible loan to cover personal expenses. Whether you're consolidating high-interest debt, paying for a wedding, or covering unexpected medical bills, a personal loan can provide the financial breathing room you need. Our competitive rates and flexible repayment plans make it a great choice for various situations.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: {
      accent: 'bg-sc-blue-600',
      accentHover: 'hover:bg-sc-blue-700',
      ring: 'focus:ring-sc-blue-500',
      light: 'bg-sc-blue-100',
      text: 'text-sc-blue-600'
    },
    action: () => console.log("Navigating to Personal Loan application..."),
  },
  {
    title: "Home Loan",
    description: "Secure financing to help you purchase a new home or refinance your existing mortgage. Our home loan options are designed to make the homebuying process as smooth as possible, with competitive interest rates and expert guidance from our loan officers. We offer various mortgage types to fit your needs.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: {
      accent: 'bg-sc-green-600',
      accentHover: 'hover:bg-sc-green-700',
      ring: 'focus:ring-sc-green-500',
      light: 'bg-sc-green-100',
      text: 'text-sc-green-600'
    },
    action: () => console.log("Navigating to Home Loan application..."),
  },
  {
    title: "Vehicle Loan",
    description: "Financing options to help you buy a new or used car, truck, or motorcycle. Our vehicle loans offer a straightforward application process and quick approval times, getting you on the road faster. With a range of terms and rates, you can find a plan that fits your budget and lifestyle.",
    image: "https://images.unsplash.com/photo-1681351623077-e4cc438f0548?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: {
      accent: 'bg-sc-blue-600',
      accentHover: 'hover:bg-sc-blue-700',
      ring: 'focus:ring-sc-blue-500',
      light: 'bg-sc-blue-100',
      text: 'text-sc-blue-600'
    },
    action: () => console.log("Navigating to Vehicle Loan application..."),
  },
  {
    title: "Education Loan",
    description: "Loans to help cover the cost of tuition, books, and living expenses for students. Our education loans come with favorable repayment terms and competitive rates, allowing you to focus on your studies without financial stress. Whether you're an undergraduate or pursuing a post-graduate degree, we can help.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    color: {
      accent: 'bg-sc-green-600',
      accentHover: 'hover:bg-sc-green-700',
      ring: 'focus:ring-sc-green-500',
      light: 'bg-sc-green-100',
      text: 'text-sc-green-600'
    },
    action: () => console.log("Navigating to Education Loan application..."),
  },
];



const BankingPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const buttonOptions = (loan) => [
    { name: 'Check Eligibility', icon: <Award className="w-5 h-5" />, action: () => alert('Check Eligibility clicked for ' + loan.title) },
    { name: 'EMI Calculator', icon: <Calculator className="w-5 h-5" />, action: () => alert('EMI Calculator clicked for ' + loan.title) },
    { name: 'Know More', icon: <FileText className="w-5 h-5" />, action: () => alert('Know More clicked for ' + loan.title) },
    { name: 'Contact Us', icon: <Phone className="w-5 h-5" />, action: () => alert('Contact Us clicked for ' + loan.title) },
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // This defines the animation for the page
const pageVariants = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100%",
  },
};

// This controls the speed and easing of the animation
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5
};

const navigate = useNavigate();

  return (
    <motion.div 
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}>
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-green-100 flex flex-col items-center p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-sc-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-sc-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-sc-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-sc-green-150 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg text-gray-700 hover:bg-gray-200 transition-colors transform hover:scale-105"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
      <div className="w-full max-w-5xl mx-auto text-center mb-10 mt-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-sc-blue-600 via-sc-green-600 to-sc-blue-700 bg-clip-text text-transparent drop-shadow-sm">
          Explore Our Loan Options
        </h1>
        <p className="text-base text-gray-600 max-w-3xl mx-auto">
          We offer a variety of loan products designed to meet your specific needs. Choose an option below to learn more and begin your application.
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        {loanOptions.map((loan, index) => {
          const isHovered = hoveredIndex === index;
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`relative flex items-center w-full max-w-5xl group`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main card content */}
              <div
                className={`bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-center relative z-10 w-full transform transition-all duration-500 ease-in-out border border-white/30 hover:shadow-3xl hover:bg-white/80 ${isReversed ? 'md:flex-row-reverse' : ''} ${isHovered ? (isReversed ? 'translate-x-48 scale-105' : '-translate-x-48 scale-105') : 'translate-x-0 scale-100'}`}
                style={{
                  boxShadow: isHovered 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)' 
                    : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                <div
                  className={`p-4 mb-4 md:mb-0 md:w-1/3 flex-shrink-0 `}
                >
                  <img 
                    src={loan.image} 
                    alt={loan.title} 
                    className={`w-64 h-64 mx-auto rounded-lg object-cover shadow-lg`} 
                  />
                </div>
                <div className="md:w-2/3 flex-grow flex flex-col p-4">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{loan.title}</h2>
                  <p className="text-sm text-gray-600 flex-grow mb-4">{loan.description}</p>
                  <Link to="/personaldetails" className={`mt-auto inline-flex items-center justify-center md:justify-start rounded-md border border-transparent ${loan.color.accent} px-5 py-2 text-sm font-medium text-white shadow-sm ${loan.color.accentHover} focus:outline-none focus:ring-2 focus:ring-offset-2 ${loan.color.ring} transition-colors self-center md:self-start`}>
                    Apply Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>

              {/* Buttons container */}
              <div className={`absolute h-full flex flex-col justify-center items-center gap-3 p-4 w-48 z-0 transform transition-all duration-500 ease-in-out ${isReversed ? 'left-0' : 'right-0'} ${isHovered ? (isReversed ? '-translate-x-10 opacity-100' : 'translate-x-10 opacity-100') : 'translate-x-0 opacity-0'}`}>
                {buttonOptions(loan).map((button, i) => (
                  <button
                    key={i}
                    onClick={button.action}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-3 rounded-lg transition-all duration-300 w-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-lg hover:bg-white/80 hover:shadow-xl hover:scale-105 hover:border-white/60 ${loan.color.text} hover:text-white`}
                    style={{
                      boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                      animationDelay: `${i * 0.1}s`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = loan.color.accent.includes('sc-blue') ? '#0f766e' : '#0369a1';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {button.icon}
                    <span className="whitespace-nowrap">{button.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </motion.div>
  );
};

export default BankingPage;