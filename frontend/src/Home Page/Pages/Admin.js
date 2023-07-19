import React from 'react';
import { useNavigate } from 'react-router-dom';
import Teacher from '../Components/images/teacher.png';
import Student from '../Components/images/student.png';
import Event from '../Components/images/event.png';
import Admission from '../Components/images/admission.png';
import SchoolDetails from '../Components/images/schoolDetails.png';
import PictureGallery from '../Components/images/PictureGallery.png';
import StudyMaterial from '../Components/images/StudyMaterial.png';
import './Admin.css';
import DocumentUpload from './DocumentUpload';

export default function Admin() {
  const navigate = useNavigate();

  function AddTeacher() {
    navigate("/AddTeacher");
  }

  function AddStudent() {
    navigate("/AddStudent");
  }

  function AddEvent() {
    navigate("/AddEvent");
  }
  function AddSchoolDetails() {
    navigate("/AddSchoolDetails");
  }
  function AddAdmission() {
    navigate("/AddAdmission");
  }
  function AddPicture() {
    navigate("/AddPicture");
  }
  function DocumentUpload() {
    navigate("/DocumentUpload");
  }
  function EditTeacher(){
    navigate("/GETeacher")
  }
  function EditStudent(){
    navigate("/GEStudent")
  }
  function EditEvent(){
    navigate("/GEEvent")
  }
  function EditAdmission(){
    navigate("/GEAdmission")
  }
  function EditSchoolDetails(){
    navigate("/EditSchoolDetails")
  }
  
  function AddAdmin() {
    navigate("/AddAdmin");
  }

  function DeleteTeacher() {
    navigate("/DeleteTeacher");
  }

  function DeleteStudent() {
    navigate("/DeleteStudent");
  }

  function DeleteEvent() {
    navigate("/DeleteEvent");
  }
  function DeleteAdmission() {
    navigate("/DeleteAdmission");
  }
  function DeletePicture(){
    navigate("/DeletePicture")
  }

  function DeleteAdmin() {
    navigate("/DeleteAdmin");
  }

  return (
    <div className="Admin">
      <center>
        <div className="card-row">
          <div className="card">
            <img src={Teacher} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddTeacher} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={EditTeacher} className="btn btn-dark">Edit</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeleteTeacher} className="btn btn-dark">Delete</button>
              </div>
            </div>
          </div>

          <div className="card">
            <img src={Student} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddStudent} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={EditStudent} className="btn btn-dark">Edit</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeleteStudent} className="btn btn-dark">Delete</button>
              </div>
            </div>
          </div>

          <div className="card">
            <img src={Event} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddEvent} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={EditEvent} className="btn btn-dark">Edit</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeleteEvent} className="btn btn-dark">Delete</button>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={Admission} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddAdmission} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={EditAdmission} className="btn btn-dark">Edit</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeleteAdmission} className="btn btn-dark">Delete</button>
              </div>
            </div>
          </div>
          <div className="card">
            <img src={SchoolDetails} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddSchoolDetails} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={EditSchoolDetails} className="btn btn-dark">Edit</button>
              </div>
              
            </div>
          </div>
          <div className="card">
            <img src={PictureGallery} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={AddPicture} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeletePicture} className="btn btn-dark">Delete</button>
              </div>
              
            </div>
          </div>
          <div className="card">
            <img src={StudyMaterial} className="card-img-top" alt="..." />
            <div className="card-body">
              <div className="One">
                <button type="button" onClick={DocumentUpload} className="btn btn-dark">Add</button>
              </div>
              <div className="One">
                <button type="button" onClick={DeletePicture} className="btn btn-dark">Delete</button>
              </div>
              
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}
