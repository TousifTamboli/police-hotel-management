import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PoliceAdminDashboard from './pages/PoliceAdminDashboard';
import HotelOwnerDashboard from './pages/HotelOwnerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage after login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            userRole === 'police' ? (
              <PoliceAdminDashboard />
            ) : (
              <HotelOwnerDashboard />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;