import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          {/* Logo and Portal Title */}
          <div className="flex items-center">
            <img
              className="h-10 w-10"
              src="/college-logo.png" 
              alt="College Logo"
            />
            <span className="ml-3 text-xl font-semibold text-gray-800">
              Student Feedback Portal
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;