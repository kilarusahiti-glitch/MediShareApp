import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: String,
    doctorId: String,
    specialization: String,
  },
  { timestamps: true }
);

export default mongoose.model("DoctorProfile", doctorProfileSchema);