import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HotelOwnerDashboard = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token being sent:", token); // ✅ Check if token exists
  
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/visitors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVisitors(response.data);
      } catch (error) {
        console.error('Error fetching visitors:', error.response?.data || error.message);
      }
    };
    fetchVisitors();
  }, []);
  
  

  return (
    <div>
      <h1>Hotel Owner Dashboard</h1>
      <h2>Visitors</h2>
      {visitors.length === 0 ? (
        <p>No visitors found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>ID Proof</th>
              <th>Mobile Number</th>
              <th>Reason for Stay</th>
              <th>Check-In Date</th>
              <th>Check-Out Date</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.name}</td>
                <td>{visitor.age}</td>
                <td>{visitor.idProof}</td>
                <td>{visitor.mobileNumber}</td>
                <td>{visitor.reasonForStay}</td>
                <td>{new Date(visitor.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(visitor.checkOutDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HotelOwnerDashboard;
