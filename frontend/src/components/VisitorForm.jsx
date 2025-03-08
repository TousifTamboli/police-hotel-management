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
      setFormData((prevData) => ({ ...prevData, photo: response.data.imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debug: Log the form data
    // console.log('Form Data:', formData);

    // Validate required fields
    if (!formData.name || !formData.age || !formData.idProof) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/visitors', { ...formData, hotelId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Visitor added successfully');
    } catch (error) {
      console.error('Error adding visitor:', error.response?.data || error.message); // Debug: Log the error
      alert('Failed to add visitor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, age: e.target.value }))}
        required
      />
      <input
        type="text"
        placeholder="ID Proof"
        value={formData.idProof}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, idProof: e.target.value }))}
        required
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input
        type="text"
        placeholder="Mobile Number"
        value={formData.mobileNumber}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, mobileNumber: e.target.value }))}
        required
      />
      <input
        type="text"
        placeholder="Reason for Stay"
        value={formData.reasonForStay}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, reasonForStay: e.target.value }))}
        required
      />
      <input
        type="date"
        placeholder="Check-In Date"
        value={formData.checkInDate}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, checkInDate: e.target.value }))}
        required
      />
      <input
        type="date"
        placeholder="Check-Out Date"
        value={formData.checkOutDate}
        onChange={(e) => setFormData((prevData) => ({ ...prevData, checkOutDate: e.target.value }))}
        required
      />
      <button type="submit">Add Visitor</button>
    </form>
  );
};

export default VisitorForm;