const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  getDiagnosticProfile,
} = require("../controllers/diagnosticController");

router.get(
  "/profile",
  protect,
  authorizeRoles("diagnostic"),
  getDiagnosticProfile
);

module.exports = router;