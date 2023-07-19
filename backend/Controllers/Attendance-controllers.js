const Attendance = require("../models/attendance");

// Create new attendance record

const createAttendance = async (req, res, next) => {
  const { studentId, date, present } = req.body;
  console.log(date)
  try {
    // Check if an attendance record already exists for the student and date
    let existingAttendance = await Attendance.findOne({
      student: studentId,
      date: date,
    });

    if (existingAttendance) {
      // Update the existing attendance record
      existingAttendance.present = present;
      await existingAttendance.save();

      return res.status(200).json({ attendance: existingAttendance });
    }

    // Create a new attendance record
    const attendance = new Attendance({
      student: studentId,
      date,
      present,
    });

    await attendance.save();

    res.status(201).json({ attendance });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create/update attendance record." });
  }
};



// Get attendance records for a specific student
const getAttendanceByStudent = async (req, res, next) => {
  const { studentId } = req.params;

  try {
    const attendance = await Attendance.find({ student: studentId });

    res.json({ attendance });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance records." });
  }
};

// Update attendance record
const updateAttendance = async (req, res, next) => {
  const { id } = req.params;
  const { present } = req.body;

  try {
    const attendance = await Attendance.findOneAndUpdate(
      { _id: id },
      { present },
      { new: true }
    );

    res.json({ attendance });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update attendance record." });
  }
};



// Delete attendance record
const deleteAttendance = async (req, res, next) => {
  const { attendanceId } = req.params;

  try {
    await Attendance.findByIdAndRemove(attendanceId);

    res.json({ message: "Attendance record deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete attendance record." });
  }
};

// Get attendance days for a specific student within a date range
const getAttendanceDaysByStudent = async (req, res, next) => {
  const { studentId, startDate, endDate } = req.params;

  try {
    const attendance = await Attendance.find({
      student: studentId,
      date: { $gte: startDate, $lte: endDate },
    });

    const attendanceDays = attendance.map((record) => record.date.toDateString());

    res.json({ attendanceDays });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance records." });
  }
};

module.exports = {
  createAttendance,
  getAttendanceByStudent,
  updateAttendance,
  deleteAttendance,
  getAttendanceDaysByStudent,
};
