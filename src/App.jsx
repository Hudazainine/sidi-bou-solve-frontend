import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from './pages/LoginPage/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignupPage from './pages/SignupPage/SignupPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';


import ProtectedRoute from './components/ProtectedRoute';
import DashboardRedirect from './components/DashboardRedirect';

function App() {
  return (
    <>
      {/* Toaster l-fouq bech yabda dima accessible lelp-pages el kol */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <Router>
        <Routes>
          {/* 1. Routes Statiques (Fixed) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />

          {/* 2. Redirection "Smart" mta' /dashboard */}
          {/* Ki user yektéb /dashboard, yit-hazz direct lil path b-ismou */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* 3. Route Dynamique (Personnalisée) */}
          {/* Hatha houwa el path elli bech yikoun fih /hedi-temani masalan */}
          <Route 
            path="/:username" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* 4. Catch-all Route (404) */}
          {/* Dima hathi hiya el ekhera bech el Routes el lokhrin ma yaklouhach */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;