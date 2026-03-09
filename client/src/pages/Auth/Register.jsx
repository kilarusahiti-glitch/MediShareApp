import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PortalTabs from "../../components/PortalTabs";
import "../../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/register/${role}`,
        formData
      );
      alert("Registration Successful!");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (role === "patient") {
        localStorage.setItem("patientProfile", JSON.stringify(formData));
        navigate("/patient-profile-form");
      } else {
        navigate(`/${role}/dashboard`);
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2>Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</h2>

        <PortalTabs role={role} setRole={setRole} />

        <form onSubmit={handleSubmit}>
          {/* Personal Section */}
          <h3>Personal Credentials</h3>

          <div className="form-row">
            <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input name="age" placeholder="Age" type="number" value={formData.age} onChange={handleChange} required />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Conditional Fields */}
          {role === "patient" && (
            <>
              <h3>Medical Details</h3>
              <div className="form-row">
                <input placeholder="Blood Group" />
                <input placeholder="Insurance Provider & Policy Number" />
              </div>
              <div className="form-row">
                <input placeholder="Emergency Contact Name" />
                <input placeholder="Emergency Contact Number" />
              </div>
            </>
          )}

          {role === "doctor" && (
            <>
              <h3>Professional Credentials</h3>
              <div className="form-row">
                <input placeholder="Specialization" />
                <input placeholder="Experience (Years)" />
              </div>
              <div className="form-row">
                <input placeholder="License Number" />
                <input placeholder="Hospital Name" />
              </div>
            </>
          )}

          {role === "diagnostic" && (
            <>
              <h3>Center Details</h3>
              <div className="form-row">
                <input placeholder="Center Name" />
                <input placeholder="Registration Number" />
              </div>
              <div className="form-row">
                <input placeholder="Address" />
                <input placeholder="Contact Number" />
              </div>
            </>
          )}

          {/* Account Section */}
          <h3>Account Credentials</h3>
          <div className="form-row">
            <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;