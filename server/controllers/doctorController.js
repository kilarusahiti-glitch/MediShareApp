const DoctorProfile = require("../models/DoctorProfile");

exports.getDoctorProfile = async (req, res) => {
  const profile = await DoctorProfile.findOne({ user: req.user._id });
  res.json(profile);
};