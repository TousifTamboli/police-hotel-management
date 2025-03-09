import { useState } from "react";

function AddVisitor() {
  const [visitorName, setVisitorName] = useState("");
  const [visitorID, setVisitorID] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hotel/add-visitor`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ visitorName, visitorID }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Visitor added successfully!");
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h2>Add Visitor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Visitor Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} required />
        <input type="text" placeholder="Visitor ID (Aadhar/Passport)" value={visitorID} onChange={(e) => setVisitorID(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddVisitor;
