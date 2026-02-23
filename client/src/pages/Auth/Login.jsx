import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/login/${role}`,
        formData
      );

      alert("Login Successful!");

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ ROLE BASED REDIRECT
      if (role === "patient") {
        const profile = localStorage.getItem("patientProfile");

        if (profile) {
          navigate("/patient/dashboard");
        } else {
          navigate("/patient/profile");
        }
      } else if (role === "doctor") {
        navigate("/doctor/dashboard");
      } else if (role === "diagnostic") {
        navigate("/diagnostic/dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("Invalid Credentials or Server Error");
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="left-section">
        <h1>
          Unified Healthcare <br />
          Experience for <br />
          Everyone.
        </h1>
        <p>
          Connect seamlessly with your medical team, access health records,
          and manage diagnostic results in one secure place.
        </p>

        <div className="stats">
          <div>
            <h2>10k+</h2>
            <span>Healthcare Partners</span>
          </div>
          <div>
            <h2>2M+</h2>
            <span>Active Patients</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">
        <h2>Welcome Back</h2>
        <p className="subtitle">Select your portal to continue.</p>

        {/* Role Tabs */}
        <div className="portal-tabs">
          {["patient", "doctor", "diagnostic"].map((item) => (
            <button
              key={item}
              className={role === item ? "active" : ""}
              onClick={() => setRole(item)}
              type="button"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your credentials"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="login-options">
            <div>
              <input type="checkbox" />
              <span> Keep me logged in</span>
            </div>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn">
            Sign In →
          </button>
        </form>

        <p className="create-account-text">
          Don’t have an account?
        </p>

        <button
          type="button"
          className="create-btn"
          onClick={() => navigate("/register")}
        >
          Create New Account
        </button>
      </div>

      <footer>©24071A05E6 D.Lakshmi Pranavi</footer>
    </div>
  );
};

export default Login;