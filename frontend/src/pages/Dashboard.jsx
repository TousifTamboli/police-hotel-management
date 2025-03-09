import { useEffect, useState } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hotel/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Hotel Dashboard</h2>
      {data.map((entry) => (
        <div key={entry._id}>
          <h3>{entry.hotelName}</h3>
          <p>Owner: {entry.ownerName}</p>
          <p>Address: {entry.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
