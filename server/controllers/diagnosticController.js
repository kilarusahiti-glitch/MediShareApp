const DiagnosticProfile = require("../models/DiagnosticProfile");

exports.getDiagnosticProfile = async (req, res) => {
  const profile = await DiagnosticProfile.findOne({ user: req.user._id });
  res.json(profile);
};