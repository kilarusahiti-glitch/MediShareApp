const PatientProfile = require("../models/PatientProfile");

exports.getPatientProfile = async (req, res) => {
  const profile = await PatientProfile.findOne({ user: req.user._id });
  res.json(profile);
};