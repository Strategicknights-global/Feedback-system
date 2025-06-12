import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import SelectionPage from './pages/SelectionPage';
import FeedbackForm from './components/FeedbackForm';
import FacilitiesForm from './pages/FacilitiesForm';
import Navbar from './components/Navbar';

const AppLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <SelectionPage />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feedback/syllabus" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FeedbackForm />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feedback/facilities" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <FacilitiesForm />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;