import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PatientDashboard from "./pages/Patient/PatientDashboard";
import PatientProfileForm from "./pages/Patient/PatientProfileForm";

// Optional placeholders if not created yet
const DoctorDashboard = () => <h2>Doctor Dashboard</h2>;
const DiagnosticDashboard = () => <h2>Diagnostic Dashboard</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route path="/patient-profile-form" element={<PatientProfileForm />} />
        <Route path="/patient/profile" element={<PatientProfileForm />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />

        {/* Doctor */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* Diagnostic */}
        <Route path="/diagnostic/dashboard" element={<DiagnosticDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;