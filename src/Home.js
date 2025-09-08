// Landing Page Component

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, User, Briefcase, Award, LifeBuoy, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { isAuthenticated, getCurrentUser, logout } from "./Service/AuthService";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 1.02 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

const Home = () => {
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticated = isAuthenticated();
      setUserAuthenticated(authenticated);
      if (authenticated) {
        setCurrentUser(getCurrentUser());
      }
    };

    checkAuthStatus();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLoginDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUserAuthenticated(false);
    setCurrentUser(null);
    navigate('/');
  };
  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="min-h-screen"
  >
    <div className="min-h-screen bg-gray-100 font-sc-prosper text-gray-800">
      {/* Navbar - Simple placeholder */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg 
                className="h-8 w-auto max-w-[180px]" 
                viewBox="0 0 157 62" 
                role="img" 
                aria-describedby="sc-logo" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <title id="sc-logo">Standard Chartered</title>
                <path fillRule="evenodd" clipRule="evenodd" className="icon-part-green" d="M28.9647 13.5687C29.8849 12.9703 30.8283 12.553 32.1542 12.5527C35.1952 12.5521 37.6604 15.0148 37.6604 18.052C37.6604 21.0891 35.1952 23.5511 32.1542 23.5511C30.8691 23.5511 29.894 23.1327 28.9647 22.5351L22.0721 18.052L28.9647 13.5687ZM4.21638 43.8988L30.0411 60.6903C32.5584 62.3193 36.0669 61.7306 37.7741 59.0631C39.4362 56.4661 38.7301 53.0234 36.1448 51.34L2.62803 29.5401C2.62803 29.5401 -0.805552 33.7103 0.23567 38.5748C0.977282 42.0396 4.21638 43.8988 4.21638 43.8988Z" fill="#38D200"></path>
                <path fillRule="evenodd" clipRule="evenodd" className="icon-part-blue" d="M1.62342 18.0384C1.62342 23.556 5.57937 25.9416 5.57937 25.9416L36.1454 45.8223C36.1454 45.8223 39.5348 41.7708 38.5313 36.8528C37.8121 33.328 34.1628 31.2393 34.1628 31.2393L13.888 18.0521L25.7872 10.3133C28.3749 8.63344 29.109 5.17668 27.4269 2.59245C25.7449 0.00822502 22.2839 -0.725041 19.6961 0.954835L5.57779 10.184C5.57779 10.184 1.62342 12.5393 1.62342 18.0384ZM8.69567 60.5642C7.77544 61.1626 6.8321 61.5799 5.50624 61.5802C2.46521 61.5809 0 59.1182 0 56.081C0 53.0439 2.46521 50.5818 5.50624 50.5818C6.79141 50.5818 7.76651 51.0003 8.69567 51.5978L15.5883 56.0809L8.69567 60.5642Z" fill="#0473EA"></path>
                <path fillRule="evenodd" clipRule="evenodd" className="logo-lettering" d="M154.98 29.7863L157.006 31.0221V45.8017H154.98V43.7137C153.992 45.1694 152.411 46.0576 150.509 46.0576C146.951 46.0576 144.407 43.4176 144.407 39.8154C144.407 36.1391 146.951 33.4497 150.509 33.4497C152.411 33.4497 153.992 34.3628 154.98 35.8431V29.7863ZM103.356 29.7807L105.357 31.0159V41.7592C105.357 43.4615 106.394 44.1277 107.704 44.1277C108.692 44.1277 109.68 43.8563 110.545 43.2395V45.1887C109.705 45.8055 108.544 46.0522 107.531 46.0522C104.937 46.0522 103.356 44.8925 103.356 41.6111V29.7807ZM116.633 33.4168C120.141 33.4168 122.439 36.0074 122.439 39.4863C122.439 39.8317 122.414 40.1771 122.365 40.4979H112.755C113.051 42.6938 114.78 44.1495 117.201 44.1495C118.758 44.1495 120.265 43.7054 121.549 42.7925V44.717C120.24 45.6053 118.758 46.0246 117.201 46.0246C113.372 46.0246 110.63 43.5573 110.63 39.8317C110.63 36.1801 112.952 33.4168 116.633 33.4168ZM137.236 33.4168C140.744 33.4168 143.042 36.0074 143.042 39.4863C143.042 39.8317 143.017 40.1771 142.968 40.4979H133.358C133.654 42.6938 135.384 44.1495 137.805 44.1495C139.361 44.1495 140.868 43.7054 142.153 42.7925V44.717C140.843 45.6053 139.361 46.0246 137.805 46.0246C133.975 46.0246 131.233 43.5573 131.233 39.8317C131.233 36.1801 133.555 33.4168 137.236 33.4168ZM85.8027 33.4167C87.705 33.4167 89.2612 34.305 90.2741 35.7607V33.6388H92.2998V45.8026H90.2741V43.73C89.2612 45.1611 87.705 46.0246 85.8027 46.0246C82.2451 46.0246 79.7007 43.3846 79.7007 39.7824C79.7007 36.1061 82.2451 33.4167 85.8027 33.4167ZM60.6783 33.4167C62.1359 33.4167 63.4946 33.8363 64.5817 34.6504V36.8956C63.6181 35.8594 62.2842 35.3166 60.8017 35.3166C58.2079 35.3166 56.3797 37.1177 56.3797 39.7084C56.3797 42.299 58.2327 44.1248 60.8267 44.1248C62.2842 44.1248 63.643 43.73 64.7052 42.8172V44.865C63.5193 45.6792 62.1112 46.0246 60.629 46.0246C56.8987 46.0246 54.3047 43.434 54.3047 39.7084C54.3047 36.0074 56.9726 33.4167 60.6783 33.4167ZM66.9284 29.783L68.9294 31.0183L68.9295 35.7113C69.8436 34.305 71.3011 33.4167 73.1538 33.4167C76.2172 33.4167 77.8478 35.662 77.8478 38.6474V45.8026H75.822V38.9928C75.822 36.6242 74.7845 35.366 72.6599 35.366C70.4117 35.366 68.9295 37.2904 68.9295 39.7084V45.8026H66.9284V29.783ZM101.86 33.4167V35.7113C99.4393 35.366 97.4135 36.9944 97.4135 40.0044V45.8026H95.4124V33.6388H97.4135V36.2295C98.3769 34.4283 99.9333 33.4167 101.86 33.4167ZM131.085 33.4167V35.7113C128.664 35.366 126.638 36.9944 126.638 40.0044V45.8026H124.637V33.6388H126.638V36.2295C127.602 34.4283 129.158 33.4167 131.085 33.4167ZM150.707 35.3496C148.236 35.3496 146.482 37.2247 146.482 39.7908C146.482 42.3073 148.236 44.1578 150.707 44.1578C153.202 44.1578 154.98 42.3073 154.98 39.7908C154.98 37.2247 153.202 35.3496 150.707 35.3496ZM86.0004 35.3166C83.5299 35.3166 81.7758 37.1917 81.7758 39.7577C81.7758 42.2743 83.5299 44.1248 86.0004 44.1248C88.4955 44.1248 90.2741 42.2743 90.2741 39.7577C90.2741 37.1917 88.4955 35.3166 86.0004 35.3166ZM116.658 35.2673C114.435 35.2673 113.101 36.8217 112.779 38.8695H120.314C120.117 36.7969 118.807 35.2673 116.658 35.2673ZM137.261 35.2673C135.038 35.2673 133.704 36.8217 133.383 38.8695H140.918C140.72 36.7969 139.41 35.2673 137.261 35.2673ZM106.911 33.4655C107.425 33.1394 108.083 33.1451 108.591 33.4801L110.607 34.8197L108.617 36.0944C108.11 36.4192 107.46 36.4201 106.952 36.0966L106.909 36.0695C105.956 35.4621 105.957 34.0712 106.911 33.4655ZM78.6879 15.6293C80.5902 15.6293 82.1466 16.5175 83.1592 17.9733V15.8513H85.185V28.0151H83.1592V25.9426C82.1466 27.3737 80.5902 28.2372 78.6879 28.2372C75.1304 28.2372 72.5859 25.5971 72.5859 21.9949C72.5859 18.3187 75.1304 15.6293 78.6879 15.6293ZM66.7805 11.9542V23.9441C66.7805 25.6465 67.8181 26.3127 69.1274 26.3127C70.1157 26.3127 71.1037 26.0413 71.9684 25.4245V27.3737C71.1286 27.9905 69.9673 28.2372 68.9544 28.2372C66.3605 28.2372 64.7794 27.0775 64.7794 23.796V13.1907L66.7805 11.9542ZM150.726 11.9551V28.0151H148.7V25.8932C147.712 27.3489 146.131 28.2372 144.229 28.2372C140.671 28.2372 138.127 25.5971 138.127 21.9949C138.127 18.3187 140.671 15.6293 144.229 15.6293C146.131 15.6293 147.712 16.5423 148.7 18.0226V13.1901L150.726 11.9551ZM121.945 15.6293C123.847 15.6293 125.404 16.5175 126.416 17.9733V15.8513H128.442V28.0151H126.416V25.9426C125.404 27.3737 123.847 28.2372 121.945 28.2372C118.388 28.2372 115.843 25.5971 115.843 21.9949C115.843 18.3187 118.388 15.6293 121.945 15.6293ZM58.6774 15.6293C60.1101 15.6293 61.4441 16.0241 62.3829 16.7396V18.8368C61.2714 17.8499 59.9124 17.2825 58.702 17.2825C57.4173 17.2825 56.5032 17.8746 56.5032 18.8615C56.5032 19.6017 56.8491 20.0458 57.8127 20.4158L60.7032 21.5755C62.2594 22.2417 62.9759 23.1792 62.9759 24.4869C62.9759 26.8062 61.0983 28.2372 58.455 28.2372C56.8491 28.2372 55.3915 27.7931 54.3293 27.0035V24.8324C55.6139 26.0413 57.0468 26.5841 58.4798 26.5841C59.9124 26.5841 60.9502 25.9673 60.9502 24.857C60.9502 24.1908 60.6043 23.6727 59.6903 23.3026L56.7998 22.143C55.3176 21.5016 54.5024 20.6627 54.5024 19.0836C54.5024 16.9617 56.207 15.6293 58.6774 15.6293ZM113.669 11.9551V28.0151H111.643V25.8932C110.655 27.3489 109.074 28.2372 107.172 28.2372C103.614 28.2372 101.07 25.5971 101.07 21.9949C101.07 18.3187 103.614 15.6293 107.172 15.6293C109.074 15.6293 110.655 16.5423 111.643 18.0226V13.1901L113.669 11.9551ZM138.003 15.6293V17.9239C135.582 17.5785 133.556 19.2069 133.556 22.217V28.0151H131.555V15.8513H133.556V18.442C134.519 16.6409 136.076 15.6293 138.003 15.6293ZM94.523 15.6293C97.5863 15.6293 99.217 17.8745 99.217 20.86V28.0151H97.1912V21.2054C97.1912 18.8368 96.1537 17.5785 94.029 17.5785C91.7809 17.5785 90.2987 19.503 90.2987 21.9209V28.0151H88.2976V15.8513H90.2987V17.9239C91.2128 16.5175 92.6703 15.6293 94.523 15.6293ZM78.8856 17.5291C76.4151 17.5291 74.661 19.4043 74.661 21.9703C74.661 24.4869 76.4151 26.3373 78.8856 26.3373C81.3807 26.3373 83.1592 24.4869 83.1592 21.9703C83.1592 19.4043 81.3807 17.5291 78.8856 17.5291ZM107.37 17.5291C104.899 17.5291 103.145 19.4043 103.145 21.9703C103.145 24.4869 104.899 26.3373 107.37 26.3373C109.865 26.3373 111.643 24.4869 111.643 21.9703C111.643 19.4043 109.865 17.5291 107.37 17.5291ZM144.427 17.5291C141.956 17.5291 140.202 19.4043 140.202 21.9703C140.202 24.4869 141.956 26.3373 144.427 26.3373C146.922 26.3373 148.7 24.4869 148.7 21.9703C148.7 19.4043 146.922 17.5291 144.427 17.5291ZM122.143 17.5291C119.672 17.5291 117.918 19.4043 117.918 21.9703C117.918 24.4869 119.672 26.3373 122.143 26.3373C124.638 26.3373 126.416 24.4869 126.416 21.9703C126.416 19.4043 124.638 17.5291 122.143 17.5291ZM69.5698 15.8293C70.0761 15.5033 70.7261 15.5009 71.2349 15.8232L71.2775 15.8502C72.2325 16.4553 72.2346 17.8462 71.2814 18.4541C70.7683 18.7815 70.1105 18.7773 69.6015 18.4435L67.5827 17.1087L69.5698 15.8293Z" fill="#1C1B1F"></path>
              </svg>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-gray-600 hover:text-sc-blue-600 transition-colors"
                onClick={() => alert('Personal Banking feature coming soon!')}
              >
                Personal
              </button>
              <button
                className="text-gray-600 hover:text-sc-green-600 transition-colors"
                onClick={() => alert('Business Banking feature coming soon!')}
              >
                Business
              </button>
              <button
                className="text-gray-600 hover:text-sc-blue-600 transition-colors"
                onClick={() => alert('About Us feature coming soon!')}
              >
                About Us
              </button>
              <button
                className="text-gray-600 hover:text-sc-green-600 transition-colors"
                onClick={() => alert('Support feature coming soon!')}
              >
                Support
              </button>
              {userAuthenticated ? (
                // Show logout button and user info when logged in
                <div className="ml-4 flex items-center gap-3">
                  <Link
                    to="/user-dashboard"
                    className="text-gray-700 hover:text-sc-blue-600 text-sm transition-colors"
                  >
                    Welcome, {currentUser?.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                // Show login dropdown when not logged in
                <div className="ml-4 relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                    className="px-4 py-2 rounded-lg bg-sc-green-600 text-white hover:bg-sc-green-700 transition-colors flex items-center gap-2"
                  >
                    Login <ChevronDown className={`w-4 h-4 transition-transform ${isLoginDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isLoginDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                    >
                      <div className="py-2">
                        <Link
                          to="/customer"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-sc-green-600 transition-colors flex items-center gap-2"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Customer Login
                        </Link>
                        <Link
                          to="/member"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-sc-blue-600 transition-colors flex items-center gap-2"
                          onClick={() => setIsLoginDropdownOpen(false)}
                        >
                          <Briefcase className="w-4 h-4" />
                          Member Login
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
            <div className="md:hidden">
              <button className="text-gray-600 focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section with Frosted Glass Effect */}
      <header className="relative bg-indigo-800 h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background image or pattern */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1568056308658-aa380181da25?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        ></div>

        {/* Frosted Glass Overlay */}
        <div className="relative z-10 p-8 rounded-2xl shadow-xl w-11/12 md:w-3/4 max-w-2xl text-center backdrop-blur-sm bg-black/40 transform transition-transform duration-500 hover:scale-105">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-md">
            Here For Good.
          </h1>
          <p className="text-base md:text-lg text-indigo-100 mt-4 mb-8 drop-shadow-md">
            We are a global bank connecting corporate, institutional and affluent clients to a network that offers unique access to sustainable growth opportunities across Asia, Africa and the Middle East.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10">
            <Link 
              className="bg-sc-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:bg-sc-blue-700 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-2 group backdrop-blur-sm border border-white/20" 
              to="/customer"
            >
              <User className="w-4 h-4 transition-transform group-hover:scale-110" />
              Customer Login
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              className="bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white font-semibold py-3 px-8 rounded-full shadow-2xl hover:bg-white hover:text-sc-green-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center gap-2 group" 
              to="/member"
            >
              <Briefcase className="w-4 h-4 transition-transform group-hover:scale-110" />
              Member Login
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Content & Animated Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-sc-blue-600 via-sc-green-600 to-sc-blue-700 bg-clip-text text-transparent drop-shadow-sm">
            Discover What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Loans with Glassmorphism */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80 relative z-10">
              <div className="p-4 rounded-full bg-sc-blue-100 inline-block mb-4">
                <Award className="w-8 h-8 text-sc-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Loans</h3>
              <p className="text-gray-600 text-sm mb-4">
                Find the perfect loan to achieve your goals. From home to
                personal, we have you covered.
              </p>
              <Link
                to="/banking"
                className="text-sc-blue-600 font-semibold flex items-center gap-2 group hover:text-sc-blue-700 transition-colors"
              >
                Explore Loans{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Card 2: Business Banking with Glassmorphism */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80 relative z-10">
              <div className="p-4 rounded-full bg-sc-green-100 inline-block mb-4">
                <Briefcase className="w-8 h-8 text-sc-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Banking for Business
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Tailored solutions to help your business thrive, from small
                startups to large enterprises.
              </p>
              <button
                className="text-sc-green-600 font-semibold flex items-center gap-2 group hover:text-sc-green-700 transition-colors"
                onClick={() => alert('Business Accounts feature coming soon!')}
              >
                Business Accounts{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Card 3: Financial Planning with Glassmorphism */}
            <div className="relative bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80 z-10">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 transition-transform duration-[4000ms] ease-in-out hover:scale-110"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0)",
                }}
              ></div>
              <div className="relative z-10">
                <div className="p-4 rounded-full bg-sc-blue-100 inline-block mb-4">
                  <Award className="w-8 h-8 text-sc-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Financial Planning
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Read our latest articles on smart financial planning and
                  investment strategies.
                </p>
                <button
                  className="text-sc-blue-600 font-semibold flex items-center gap-2 group hover:text-sc-blue-700 transition-colors"
                  onClick={() => alert('Financial Articles feature coming soon!')}
                >
                  Read Articles{" "}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Card 4: Support with Glassmorphism */}
            <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/80 relative z-10">
              <div className="p-4 rounded-full bg-sc-green-100 inline-block mb-4">
                <LifeBuoy className="w-8 h-8 text-sc-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our dedicated support team is available around the clock to
                assist you with any questions.
              </p>
              <button
                className="text-sc-green-600 font-semibold flex items-center gap-2 group hover:text-sc-green-700 transition-colors"
                onClick={() => alert('Support chat feature coming soon!')}
              >
                Get Help{" "}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <svg 
                    className="h-6 w-auto mr-2" 
                    viewBox="0 0 40 62" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path className="icon-part-green" d="M28.9647 13.5687C29.8849 12.9703 30.8283 12.553 32.1542 12.5527C35.1952 12.5521 37.6604 15.0148 37.6604 18.052C37.6604 21.0891 35.1952 23.5511 32.1542 23.5511C30.8691 23.5511 29.894 23.1327 28.9647 22.5351L22.0721 18.052L28.9647 13.5687ZM4.21638 43.8988L30.0411 60.6903C32.5584 62.3193 36.0669 61.7306 37.7741 59.0631C39.4362 56.4661 38.7301 53.0234 36.1448 51.34L2.62803 29.5401C2.62803 29.5401 -0.805552 33.7103 0.23567 38.5748C0.977282 42.0396 4.21638 43.8988 4.21638 43.8988Z" fill="#38D200"></path>
                    <path className="icon-part-blue" d="M1.62342 18.0384C1.62342 23.556 5.57937 25.9416 5.57937 25.9416L36.1454 45.8223C36.1454 45.8223 39.5348 41.7708 38.5313 36.8528C37.8121 33.328 34.1628 31.2393 34.1628 31.2393L13.888 18.0521L25.7872 10.3133C28.3749 8.63344 29.109 5.17668 27.4269 2.59245C25.7449 0.00822502 22.2839 -0.725041 19.6961 0.954835L5.57779 10.184C5.57779 10.184 1.62342 12.5393 1.62342 18.0384ZM8.69567 60.5642C7.77544 61.1626 6.8321 61.5799 5.50624 61.5802C2.46521 61.5809 0 59.1182 0 56.081C0 53.0439 2.46521 50.5818 5.50624 50.5818C6.79141 50.5818 7.76651 51.0003 8.69567 51.5978L15.5883 56.0809L8.69567 60.5642Z" fill="#0473EA"></path>
                  </svg>
                  <span className="text-white font-bold text-lg font-sc-prosper">Standard Chartered</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-md">
                A leading international banking group, with a presence in 59 of the world's most dynamic markets.
              </p>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-sc-green-400 transition-colors">Personal Banking</button></li>
                <li><button className="hover:text-sc-green-400 transition-colors">Business Banking</button></li>
                <li><button className="hover:text-sc-green-400 transition-colors">Loans & Mortgages</button></li>
                <li><button className="hover:text-sc-green-400 transition-colors">Investment Services</button></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><button className="hover:text-sc-blue-400 transition-colors">Help Center</button></li>
                <li><button className="hover:text-sc-blue-400 transition-colors">Contact Us</button></li>
                <li><button className="hover:text-sc-blue-400 transition-colors">Branch Locator</button></li>
                <li><button className="hover:text-sc-blue-400 transition-colors">Security Center</button></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 Standard Chartered Bank. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</button>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </motion.div>
  );
};

export default Home;
