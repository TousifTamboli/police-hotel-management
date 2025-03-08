import React, { useState } from 'react';
import axios from 'axios';

const HotelForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    noc: '',
    completionCertificate: '',
    tradeLicense: '',
    policeVerification: '',
    fireSafetyCertificate: '',
    gstRegistration: '',
    propertyInsurance: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/hotels', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Hotel added successfully');
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      {/* Add other fields */}
      <button type="submit">Add Hotel</button>
    </form>
  );
};

export default HotelForm;