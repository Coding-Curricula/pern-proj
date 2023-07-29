import React, { useState, useEffect } from "react";

import "./App.css";

const AutoList = () => {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ year: "", brand: "", model: "" });

  useEffect(() => {
    fetchAutos();
  }, []);

  const fetchAutos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/autos");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setAutos(data);
      setLoading(false); // Data fetching completed, set loading to false
    } catch (error) {
      console.error("Error fetching autos:", error);
      setLoading(false); // In case of error, still set loading to false to render the error message
    }
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/autos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setAutos((prevAutos) => [...prevAutos, data]);
      setFormData({ year: "", brand: "", model: "" });
    } catch (error) {
      console.error("Error creating auto:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/autos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      // Update the autos list by removing the deleted auto
      setAutos((prevAutos) => prevAutos.filter((auto) => auto.id !== id));
    } catch (error) {
      console.error("Error deleting auto:", error);
    }
  };

  if (loading) {
    return <div className="loading__spinner"></div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />
        <label htmlFor="model">Model</label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>List of Autos</h2>
      <ul>
        {autos.map((auto) => (
          <li key={auto.id}>
            {auto.year} - {auto.brand} - {auto.model}
            <button onClick={() => handleDelete(auto.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoList;
