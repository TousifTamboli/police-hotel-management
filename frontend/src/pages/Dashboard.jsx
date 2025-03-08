import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HotelForm from '../components/HotelForm';
import VisitorForm from '../components/VisitorForm';

const Dashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/hotels', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <HotelForm />
      {hotels.map((hotel) => (
        <div key={hotel._id} onClick={() => setSelectedHotel(hotel._id)}>
          {hotel.name}
        </div>
      ))}
      {selectedHotel && <VisitorForm hotelId={selectedHotel} />}
    </div>
  );
};

export default Dashboard;