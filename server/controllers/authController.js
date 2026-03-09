import bcrypt from "bcryptjs";
import User from "../models/User.js";
import PatientProfile from "../models/PatientProfile.js";
import DoctorProfile from "../models/DoctorProfile.js";
import DiagnosticProfile from "../models/DiagnosticProfile.js";
import generateToken from "../utils/generateTokens.js";

export const register = async (req, res) => {
  const { role } = req.params;
  try {
    const { email, password, ...profileData } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    // Create profile based on role
    if (role === "patient") {
      await PatientProfile.create({ user: user._id, ...profileData });
    }

    if (role === "doctor") {
      await DoctorProfile.create({ user: user._id, ...profileData });
    }

    if (role === "diagnostic") {
      await DiagnosticProfile.create({ user: user._id, ...profileData });
    }

    res.json({ 
      message: "Registered successfully",
      token: generateToken(user._id, user.role),
      role: user.role
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};

export const login = async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  const user = await User.findOne({ email, role });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    token: generateToken(user._id, user.role),
    role: user.role,
  });
};