const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const gradingControllers = require("../Controllers/Grading-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/get", gradingControllers.getGrades);
router.get("/getById/:id", gradingControllers.getGradesById);
router.get("/getByClass/:classNumber", gradingControllers.getGradesByClass);
router.use(checkAuth)
router.post(
  "/add",
  [check("student").notEmpty(),
  check("studentName").notEmpty(),
  check("rollNumber").notEmpty(),
  check("examName").notEmpty(),
  check("classNumber").notEmpty(),
  check("subjects").notEmpty(),
  check("totalMarks").notEmpty(),
  check("percentage").notEmpty(),
    
],
  gradingControllers.createGrades
);
module.exports=router