import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PoliceAdminDashboard = () => {
console.log('Rendering PoliceAdminDashboard');
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [visitors, setVisitors] = useState([]);

  // Fetch all hotels
  useEffect(() => {
    const fetchHotels = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log("Fetching hotels with token:", token);
    const response = await axios.get('/api/hotels', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Hotels fetched:", response.data);
    setHotels(response.data);
  } catch (error) {
    console.error('Error fetching hotels:', error.response?.data || error.message);
  }
};

    fetchHotels();
  }, []);

  // Fetch visitors for the selected hotel
  useEffect(() => {
    if (selectedHotel) {
      const fetchVisitors = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/visitors/${selectedHotel}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setVisitors(response.data);
        } catch (error) {
          console.error('Error fetching visitors:', error);
        }
      };
      fetchVisitors();
    }
  }, [selectedHotel]);

  return (
    <div>
      <h1>Police Admin Dashboard</h1>
      <h2>Hotels</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id} onClick={() => setSelectedHotel(hotel._id)}>
            {hotel.name} - {hotel.address}
          </li>
        ))}
      </ul>

      {selectedHotel && (
        <div>
          <h2>Visitors for Selected Hotel</h2>
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
      )}
    </div>
  );
};

export default PoliceAdminDashboard;