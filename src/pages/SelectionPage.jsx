import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SelectionPage = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Animated Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-background-zoom"
        style={{ backgroundImage: "url('/college-bg.jpg')" }}
      ></div>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Centering Flex container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">

        {/* The Glassmorphism Card */}
        <div 
          className="bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-2xl text-center w-11/12 max-w-xl
                     border border-white/20 opacity-0 animate-fade-in-up"
          style={{ animationFillMode: 'forwards' }}
        >
          {/* Title */}
          <h2 
            className="text-3xl sm:text-4xl font-bold text-white mb-8 tracking-wide opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Select the Form you would like to fill
          </h2>
          
          {/* Main Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <Link
              to="/feedback/syllabus"
              className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg 
                         hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400
                         transform transition-all duration-300"
            >
              Feedback on Syllabi
            </Link>

            <Link
              to="/feedback/facilities"
              className="w-full sm:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg 
                         hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-400
                         transform transition-all duration-300"
            >
              Feedback on Facilities
            </Link>
          </div>

          {/* Logout Button */}
          <div 
            className="mt-12 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            <button
              onClick={handleLogout}
              className="px-8 py-2 font-semibold text-red-300 bg-transparent border-2 border-red-400/50 rounded-lg
                         hover:bg-red-500/20 hover:text-white hover:border-red-400
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-400
                         transform transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-4 right-4 text-white/50 text-sm z-10 font-light">
        Designed by: Strategic Knights
      </div>
    </div>
  );
};

export default SelectionPage;