import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ownerName: "",
    hotelName: "",
    address: "",
    noc: null,
    buildingCert: null,
    tradeLicense: null,
    policeVerification: null,
    fireSafety: null,
    gst: null,
    insurance: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("ownerName", formData.ownerName);
      data.append("hotelName", formData.hotelName);
      data.append("address", formData.address);
      data.append("noc", formData.noc);
      data.append("buildingCert", formData.buildingCert);
      data.append("tradeLicense", formData.tradeLicense);
      data.append("policeVerification", formData.policeVerification);
      data.append("fireSafety", formData.fireSafety);
      data.append("gst", formData.gst);
      data.append("insurance", formData.insurance);

      const response = await fetch("http://localhost:5000/api/hotel/signup", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Signup successful! You can now login.");
      } else {
        setMessage(result.message || "Signup failed. Try again.");
      }
    } catch (error) {
      setMessage("Error signing up. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Hotel Owner Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
        <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />

        <label>No Objection Certificate (NOC)</label>
        <input type="file" name="noc" accept="image/*" onChange={handleFileChange} required />

        <label>Building Completion Certificate</label>
        <input type="file" name="buildingCert" accept="image/*" onChange={handleFileChange} required />

        <label>Trade License</label>
        <input type="file" name="tradeLicense" accept="image/*" onChange={handleFileChange} required />

        <label>Police Verification</label>
        <input type="file" name="policeVerification" accept="image/*" onChange={handleFileChange} required />

        <label>Fire Safety Certificate</label>
        <input type="file" name="fireSafety" accept="image/*" onChange={handleFileChange} required />

        <label>GST Registration</label>
        <input type="file" name="gst" accept="image/*" onChange={handleFileChange} required />

        <label>Property Insurance</label>
        <input type="file" name="insurance" accept="image/*" onChange={handleFileChange} required />

        <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default Signup;
