const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getDoctorProfile,
} = require("../controllers/doctorController");

router.get(
  "/profile",
  protect,
  authorizeRoles("doctor"),
  getDoctorProfile
);

module.exports = router;