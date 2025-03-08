import React, { useState } from 'react';
import axios from 'axios';

const VisitorForm = ({ hotelId }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    idProof: '',
    photo: '',
    mobileNumber: '',
    reasonForStay: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData({ ...formData, photo: response.data.imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/visitors', { ...formData, hotelId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Visitor added successfully');
    } catch (error) {
      console.error('Error adding visitor:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
      <input type="text" placeholder="ID Proof" value={formData.idProof} onChange={(e) => setFormData({ ...formData, idProof: e.target.value })} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input type="text" placeholder="Mobile Number" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} />
      <input type="text" placeholder="Reason for Stay" value={formData.reasonForStay} onChange={(e) => setFormData({ ...formData, reasonForStay: e.target.value })} />
      <input type="date" placeholder="Check-In Date" value={formData.checkInDate} onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })} />
      <input type="date" placeholder="Check-Out Date" value={formData.checkOutDate} onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })} />
      <button type="submit">Add Visitor</button>
    </form>
  );
};

export default VisitorForm;