import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // ✅ added loading state
  const [fadeOut, setFadeOut] = useState(false);  // ✅ fade out state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);  // ✅ show spinner
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      let valid = false;
      let userData = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.password === password) {
          valid = true;
          userData = data;
        }
      });

      if (valid) {
        setError("");
        login(userData);
        setFadeOut(true);  // ✅ start fade out
        setTimeout(() => {
          navigate("/select-form");
        }, 800);  // wait for animation before navigating
      } else {
        setError("Incorrect password.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center animate-background-zoom"
        style={{ backgroundImage: "url('/college-bg.jpg')" }}></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className={`relative min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-0 left-0 p-4 sm:p-6 flex items-center">
            <img className="h-10 w-10 sm:h-12 sm:w-12" src="/college-logo.png" alt="College Logo" />
            <span className="ml-3 text-xl font-semibold text-white">Student Feedback Portal</span>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl text-center w-11/12 max-w-sm opacity-0 animate-fade-in-up"
          style={{ animationFillMode: 'forwards' }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="text"
              name="username"
              placeholder="Roll.no"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-slate-700"
              required
            />
            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            
            <button
              type="submit"
              className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-2">Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
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
