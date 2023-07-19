import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./Home Page/Pages/Home";
import About from "./Home Page/Pages/About";
import Service from "./Home Page/Pages/Service";
import Contact from "./Home Page/Pages/Contact";
import AddTeacher from "./Home Page/Pages/AddTeacher";
import Attendance from "./Home Page/Pages/Attendance";
import Navbar from "./Home Page/Components/Navbar";
import Login from "./Home Page/Pages/Login";
import Signup from "./Home Page/Pages/Signup";
import { AuthContext } from "./Shared/Context/Auth-context";
import Admin from "./Home Page/Pages/Admin";
import AddStudent from "./Home Page/Pages/AddStudent";
import AddEvent from "./Home Page/Pages/AddEvent";
import EditTeacher from "./Home Page/Pages/EditTeacher";
import GETeachers from "./Home Page/Pages/GETeacher";
import GEStudent from "./Home Page/Pages/GEStudent";
import GEEvent from "./Home Page/Pages/GEEvent";
import EditStudent from "./Home Page/Pages/EditStudent";
import EditEvent from "./Home Page/Pages/EditEvent";
import DeleteTeacher from "./Home Page/Pages/DeleteTeacher";
import DeleteStudent from "./Home Page/Pages/DeleteStudent";
import DeleteEvent from "./Home Page/Pages/DeleteEvent";
import AddSchoolDetails from "./Home Page/Pages/AddSchoolDetails";
import EditSchoolDetails from "./Home Page/Pages/EditSchoolDetails";
import AddAdmission from "./Home Page/Pages/AddAdmission";
import GEAdmission from "./Home Page/Pages/GEAdmission";
import EditAdmission from "./Home Page/Pages/EditAdmission";
import NewAdmission from "./Home Page/Pages/NewAdmission";
import AttendMarks from "./Home Page/Pages/AttendMarks";
import DocumentUpload from "./Home Page/Pages/DocumentUpload";
import Studymaterials from "./Home Page/Pages/Studymaterials";
import Student from "./Home Page/Pages/Student";
import TeacherLogin from "./Home Page/Pages/TeacherLogin";
import AddPicture from "./Home Page/Pages/AddPicture";
import DeletePicture from "./Home Page/Pages/DeletePicture";
import { useAuth } from "./Shared/Hooks/auth-hook";
import AttendanceClass from "./Home Page/Pages/AttendanceClass";
import GradingSystem from "./Home Page/Pages/GradingSystem";
import GradingClass from "./Home Page/Pages/GradingClass";
import PerformancePage from "./Home Page/Pages/PerformancePage";
import PerformanceClass from "./Home Page/Pages/PerformanceClass";


const App = () => {
  const{token,login,logout,userId}=useAuth()

  let routes 

  if (token) {
    routes = (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/about" element={<About />} exact/>
          <Route path="/service" element={<Service />} exact/>
          <Route path="/contact" element={<Contact />} exact/>
          <Route path="/admin" element={<Admin/>}exact/>
          <Route path="/AddTeacher" element={<AddTeacher />}exact />
          <Route path="/AddStudent" element={<AddStudent />} exact/>
          <Route path="/AddEvent" element={<AddEvent />} exact/>
          <Route path="/AddSchoolDetails" element={<AddSchoolDetails />} exact/>
          <Route path="/AddAdmission" element={<AddAdmission />} exact/>
          <Route path="/AddPicture" element={<AddPicture />} exact/>
          <Route path="/GETeacher" element={<GETeachers />} exact/>
          <Route path="/GEStudent" element={<GEStudent />} exact/>
          <Route path="/GEEvent" element={<GEEvent />} exact/>
          <Route path="/GEAdmission" element={<GEAdmission />} exact/>
          <Route path="/EditTeacher/:email" element={<EditTeacher />} exact/>
          <Route path="/EditStudent/:id" element={<EditStudent />} exact/>
          <Route path="/EditEvent/:id" element={<EditEvent />} exact/>
          <Route path="/EditAdmission/:id" element={<EditAdmission />} exact/>
          <Route path="/EditSchoolDetails" element={<EditSchoolDetails />} exact/>
          <Route path="/DeleteTeacher" element={<DeleteTeacher />} exact/>
          <Route path="/DeleteStudent" element={<DeleteStudent />} exact/>
          <Route path="/DeleteEvent" element={<DeleteEvent />} exact/>
          <Route path="/DeletePicture" element={<DeletePicture />} exact/>
          <Route path="/Admission" element={<NewAdmission />} exact/>
          <Route path="/Attendance/:classNumber" element={<Attendance />} />
          <Route path="/AttendanceClass" element={<AttendanceClass />} exact/>
          <Route path="/attendanceMarks" element={<AttendMarks/>}exact/>
          <Route path="/DocumentUpload" element={<DocumentUpload/>}exact/>
          <Route path="/Studymaterials" element={<Studymaterials />} exact/>
          <Route path="/Grades/:classNumber" element={<GradingSystem />} exact/>
          <Route path="/GradingClass" element={<GradingClass />} exact/>
          <Route path="/Performance/:classNumber" element={<PerformancePage />} exact/>
          <Route path="/PerformanceClass" element={<PerformanceClass />} exact/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Fragment>
    );
  }else{
     routes = (
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact/>
          <Route path="/about" element={<About />} exact/>
          <Route path="/service" element={<Service />} exact/>
          <Route path="/contact" element={<Contact />} exact/>
          <Route path="/signup" element={<Signup />} exact/>
          <Route path="/adminLogin" element={<Login/>}exact/>
          <Route path="/TeacherLogin" element={<TeacherLogin/>}exact/>
          <Route path="/Admission" element={<NewAdmission />} exact/>
          <Route path="/Studymaterials" element={<Studymaterials />} exact/>
          <Route path="/Student" element={<Student />} exact/>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token:token,
        login: login,
        logout: logout
      }}
    >
      
      <main>{routes}</main>
      
    </AuthContext.Provider>
  );
};

export default App;
