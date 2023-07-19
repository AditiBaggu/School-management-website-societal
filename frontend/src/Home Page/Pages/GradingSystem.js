import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Shared/Context/Auth-context";
import { useForm } from "../../Shared/Hooks/form-hook";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import "./GradingSystem.css";

const GradingSystem = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [maxMarks, setMaxMarks] = useState({});
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { classNumber } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:4444/api/students/get/class/${classNumber}`
        );
        const sortedStudents = responseData.students.sort((a, b) =>
          a.rollNumber.localeCompare(b.rollNumber, undefined, { numeric: true })
        );

        setStudents(sortedStudents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [classNumber, sendRequest]);

  const handleAddSubject = () => {
    const newSubject = "";
    setSubjects([...subjects, newSubject]);
    setMaxMarks({ ...maxMarks, [newSubject]: 100 }); // Set default maximum marks as 100
  };

  const handleDeleteSubject = (subject) => {
    const updatedSubjects = subjects.filter((item) => item !== subject);
    setSubjects(updatedSubjects);

    const updatedMaxMarks = { ...maxMarks };
    delete updatedMaxMarks[subject];
    setMaxMarks(updatedMaxMarks);
  };

  const handleSubjectChange = (index, event) => {
    const { value } = event.target;
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  const handleMaxMarksChange = (subject, event) => {
    const { value } = event.target;
    const updatedMaxMarks = { ...maxMarks };
    updatedMaxMarks[subject] = parseInt(value);
    setMaxMarks(updatedMaxMarks);
  };

  const calculateTotalMarks = (student) => {
    let total = 0;
    subjects.forEach((subject) => {
      const mark = parseInt(student[subject]) || 0;
      total += mark;
    });
    return total;
  };

  const calculatePercentage = (student) => {
    let totalMarks = calculateTotalMarks(student);
    let totalMaxMarks = 0;

    subjects.forEach((subject) => {
      totalMaxMarks += maxMarks[subject] || 0;
    });

    let percentage = 0;
    if (totalMaxMarks !== 0) {
      percentage = (totalMarks / totalMaxMarks) * 100;
    }

    return percentage.toFixed(2);
  };
  const [examName, setExamName] = useState("");

const consolee = (event) => {
  setExamName(event.target.value);
};
  const auth = useContext(AuthContext);
  const gradingSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs.examName.value);
    try {
      
      if (!examName) {
        // Add a validation check for examName field
        console.log("Exam Name is required");
        return;
      }
  
      for (const student of students) {
        const gradingData = {
          student: student._id,
          studentName:student.studentName,
          rollNumber:student.rollNumber,
          examName: examName,
          classNumber: classNumber,
          subjects: subjects.map((subject) => ({
            subjectName: subject,
            maxMarks: maxMarks[subject] || 0,
            marksObtained: parseInt(student[subject]) || 0,
          })),
          totalMarks: calculateTotalMarks(student),
          percentage: calculatePercentage(student),
        };
  
        await sendRequest(
          "http://localhost:4444/api/grading/add",
          "POST",
          JSON.stringify(gradingData),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      }
      
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  
  const [formState, inputHandler] = useForm(
    {
      examName: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  

  return (
    <div className="GradingSystem">
      <h2>Grading System</h2>
       <form onSubmit={gradingSubmitHandler}>
       <center>   <div>
          <label htmlFor="examName">Exam Name:</label> &nbsp;
          <input
            type="text"
            id="examName"
            name="examName"
            onChange={inputHandler}
            onInput={consolee}
          />
        </div></center> 
        <button className="button" onClick={handleAddSubject}>
          Add Subject
        </button>
        {subjects.length > 0 && (
          <div>
            <p>Subjects:</p>
            {subjects.map((subject, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Subject Name"
                  value={subject}
                  onChange={(event) => handleSubjectChange(index, event)}
                />
                <input
                  type="number"
                  className="input-number"
                  placeholder="Max Marks"
                  min={0}
                  value={maxMarks[subject] || ""}
                  onChange={(event) => handleMaxMarksChange(subject, event)}
                />
                <button onClick={() => handleDeleteSubject(subject)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th className="name-cell">Student Name</th>
              <th>Roll No</th>
              {subjects.map((subject, index) => (
                <th key={index}>{subject}</th>
              ))}
              <th>Total Marks</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{student.studentName}</td>
                <td>{student.rollNumber}</td>
                {subjects.map((subject, subjectIndex) => (
                  <td key={subjectIndex}>
                    <input
                      type="number"
                      className="input-number"
                      placeholder={`Max: ${maxMarks[subject]}`}
                      min={0}
                      value={student[subject] || ""}
                      onChange={(event) => {
                        const updatedStudents = [...students];
                        updatedStudents[studentIndex][subject] =
                          event.target.value;
                        setStudents(updatedStudents);
                      }}
                    />
                  </td>
                ))}
                <td>{calculateTotalMarks(student)}</td>
                <td>{calculatePercentage(student)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br/>
       <center> <button type="submit" className="submit">Submit</button></center>
      </form>
    </div>
  );
};

export default GradingSystem;
