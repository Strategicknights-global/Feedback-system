import React from 'react';

const Navbar = () => {
  return (
    // The main navbar container with a white background and a subtle shadow.
    // It's sticky, so it stays at the top of the page when you scroll.
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-16">
          {/* Logo and Portal Title */}
          <div className="flex items-center">
            <img
              className="h-10 w-10"
              src="/college-logo.png" // Vite automatically serves files from the public folder
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