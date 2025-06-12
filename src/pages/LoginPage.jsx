import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const success = login(userId, password);
    if (success) {
      navigate('/');
    } else {
      setError('User not found.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background and Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-background-zoom"
        style={{ backgroundImage: "url('/college-bg.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Centering Flex container */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo and Title - mimicking the Navbar for this page */}
        <div className="absolute top-0 left-0 p-4 sm:p-6 flex items-center">
            <img className="h-10 w-10 sm:h-12 sm:w-12" src="/college-logo.png" alt="College Logo" />
            <span className="ml-3 text-xl font-semibold text-white">Student Feedback Portal</span>
        </div>

        {/* The Login Card */}
        <div 
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center w-11/12 max-w-sm
                     opacity-0 animate-fade-in-up"
          style={{ animationFillMode: 'forwards' }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
            Login
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Roll.no"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
              required
            />
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg
                         hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transform transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <Link to="#" onClick={(e) => { e.preventDefault(); alert("Forgot Password functionality coming soon!"); }} 
                  className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
       <div className="absolute bottom-4 right-4 text-white/50 text-sm z-10 font-light">
        Designed by: Strategic Knights
      </div>
    </div>
  );
};

export default LoginPage;