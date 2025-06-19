import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Default redirect to / if someone accesses unknown path */}
          <Route path="*" element={<Navigate to="/" />} />

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
