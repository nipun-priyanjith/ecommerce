import React, { useState, useContext } from "react";
import { AdminAuthContext } from "../../context/AdminAuthContext";
import { registerAdmin } from "../../service/ApiAdmin";
import { useNavigate } from "react-router-dom";
function Aregister() {
  const { adminLogin } = useContext(AdminAuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerAdmin(formData);
      if (response && response.success) {
        // Automatically login the admin after registration
        adminLogin(response.admin, response.token);
        alert("Admin registered and logged in successfully!");
        navigate("/admin");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Sign Up</h2>
      <label>
        Full Name:
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Aregister;
