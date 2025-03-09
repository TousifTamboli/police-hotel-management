import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/hotel/dashboard", { // Use relative path
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Hotel Dashboard</h2>
      <h3>{data.hotelName}</h3>
      <p><strong>Owner:</strong> {data.ownerName}</p>
      <p><strong>Address:</strong> {data.address}</p>

      <h4>Documents:</h4>
      <ul>
        {Object.entries(data.documents).map(([key, url]) => (
          url && (
            <li key={key}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </a>
            </li>
          )
        ))}
      </ul>

      <button onClick={() => navigate("/add-visitor")}>Add Visitor</button>
    </div>
  );
}

export default Dashboard;
