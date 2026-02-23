import React, { useEffect, useState } from "react";
import "../../styles/patientDashboard.css";

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const data = localStorage.getItem("patientProfile");
    if (data) {
      setPatient(JSON.parse(data));
    }
  }, []);

  if (!patient) {
    return <h2 className="no-profile">No Patient Profile Found</h2>;
  }

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">+</div>
          <div>
            <h3>MediShare</h3>
          </div>
        </div>

        <nav>
          <button className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button className={`nav-item ${activeTab === "appointments" ? "active" : ""}`} onClick={() => setActiveTab("appointments")}>Appointments</button>
          <button className={`nav-item ${activeTab === "history" ? "active" : ""}`} onClick={() => setActiveTab("history")}>Medical History</button>
          <button className={`nav-item ${activeTab === "medications" ? "active" : ""}`} onClick={() => setActiveTab("medications")}>Medications</button>
          <button className={`nav-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>Profile</button>
        </nav>

        <button className="appearance-btn">☀ Appearance</button>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOP BAR */}
        <div className="topbar">
          <input
            className="search"
            placeholder="Search medications or records..."
          />

          <div className="top-right">
            <span className="bell">🔔</span>
            <div className="user">
              <div>
                <strong>{patient.name || "Patient"}</strong>
              </div>
              <div className="avatar">👤</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {/* CENTER */}
          <section className="center">
            {activeTab === "dashboard" && (
              <>
                {/* PROFILE CARD */}
                <div className="card profile-card">
                  <div className="profile-left">
                    <div className="big-avatar">👤</div>
                    <div>
                      <h2>{patient.name || "Patient"}</h2>
                      <p>Patient ID: {patient.id || "MC-94821"}</p>
                    </div>
                  </div>

                  <div className="adherence">
                    <p>OVERALL ADHERENCE RATE</p>
                    <div className="progress">
                      <div className="bar" />
                    </div>
                    <span>—</span>
                  </div>

                  <div className="allergy-box">
                    ⚠ <strong>CRITICAL ALLERGIES</strong>
                    <p>{patient.allergies || "Not provided"}</p>
                  </div>
                </div>

                {/* MEDICATION SCHEDULE */}
                <div className="card schedule">
                  <div className="schedule-header">
                    <div>
                      <h2>Medication Schedule</h2>
                      <p>Current Medications</p>
                    </div>
                    <button className="new-btn">＋ New Appointment</button>
                  </div>

                  {patient.medications ? (
                    <div className="medication-list">
                      <p>{patient.medications}</p>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No medications scheduled.</p>
                      <span>Add a prescription to see it here.</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "history" && (
              <div className="card">
                <h2>Medical History</h2>
                <div className="medication-list">
                  <h3>Medications Used</h3>
                  <p>{patient.medications || "No medications recorded"}</p>
                </div>
              </div>
            )}

            {activeTab === "medications" && (
              <div className="card">
                <h2>Current Medications</h2>
                <div className="medication-list">
                  <p>{patient.medications || "No medications recorded"}</p>
                </div>
              </div>
            )}

            {activeTab === "appointments" && (
              <div className="card">
                <h2>Appointments</h2>
                <div className="empty-state">
                  <p>No appointments scheduled</p>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="card">
                <h2>Profile Information</h2>
                <div className="profile-info">
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Weight:</strong> {patient.weight} kg</p>
                  <p><strong>Height:</strong> {patient.height} cm</p>
                  <p><strong>Allergies:</strong> {patient.allergies}</p>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT PANEL */}
          <aside className="right">
            <div className="card">
              <div className="right-header">
                <h3>Recent Activity</h3>
                <span className="link">View All</span>
              </div>

              <div className="empty-state">
                <p>No recent activity.</p>
                <span>Medication logs will appear here.</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
