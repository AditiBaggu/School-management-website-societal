const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/Attendance-controllers");

// Create new attendance record
router.post("/save", attendanceController.createAttendance);

// Get attendance records for a specific student

router.get("/student/:studentId", attendanceController.getAttendanceByStudent);
router.get("/student/:studentId", attendanceController.getAttendanceByStudent);
router.get("/student/presentDays/:studentId", attendanceController.getAttendanceDaysByStudent);

// Update attendance record
router.patch("/student/:id", attendanceController.updateAttendance);

// Delete attendance record
router.delete("/:attendanceId", attendanceController.deleteAttendance);

module.exports = router;
