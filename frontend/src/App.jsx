import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PoliceAdminDashboard from './pages/PoliceAdminDashboard';
import HotelOwnerDashboard from './pages/HotelOwnerDashboard';

const App = () => {
  const userRole = localStorage.getItem('role'); // Fetch role from localStorage

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard/police" element={userRole === 'police' ? <PoliceAdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/dashboard/hotel" element={userRole === 'hotelOwner' ? <HotelOwnerDashboard /> : <Navigate to="/login" />} />

        {/* Default dashboard redirection */}
        <Route
          path="/dashboard"
          element={
            userRole === 'police'
              ? <Navigate to="/dashboard/police" />
              : userRole === 'hotelOwner'
              ? <Navigate to="/dashboard/hotel" />
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
