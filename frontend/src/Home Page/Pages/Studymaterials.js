import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Select,Button } from 'antd';
import './Studymaterials.css';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import { useForm } from '../../Shared/Hooks/form-hook';

const { Option } = Select;
const Studymaterials = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      file: {
        value: null,
        isValid: false,
      },
      classNumber: {
        value: "",
        isValid: false,
      },
      subject: {
        value: "",
        isValid: false,
      },
   
     
      
    },
    false
  );

  const navigate = useNavigate();
 

  const materialSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("file", formState.inputs.file.value);
      formData.append("classNumber", formState.inputs.classNumber.value);
      formData.append("subject", formState.inputs.subject.value); // Add subjects to form data
      await sendRequest(
        "http://localhost:4444/api/joshua/authentication/teacher/createteacher",
        "POST",
        formData // Pass formData as the request body
      );
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="studymaterials">
    <div className="card-container">
      <Card className="dropdown-card" hoverable>
        <form onSubmit={materialSubmitHandler}>
      <div className="header-container">
        <h2>Select Class:</h2>
        <h2>Select Subject:</h2>
      </div>        
      <div className="dropdown-container">
          <Select
            id="classNumber"
            placeholder="Select Class"
            className="dropdown"
            dropdownStyle={{ top: 'auto', bottom: 40 }} // Set dropdownStyle for the first Select component

          >
            <Option value="class1">Class 1</Option>
            <Option value="class2">Class 2</Option>
            <Option value="class3">Class 3</Option>
            <Option value="class4">Class 4</Option>
            <Option value="class5">Class 5</Option>
            <Option value="class6">Class 6</Option>
            <Option value="class7">Class 7</Option>
            <Option value="class8">Class 8</Option>
            <Option value="class9">Class 9</Option>
            <Option value="class10">Class 10</Option>

          </Select>
          <Select
            id="subject"
            placeholder="Select Subject"
            className="dropdown"
          >
            <Option value="maths">Maths</Option>
            <Option value="science">Science</Option>
            <Option value="english">English</Option>
            <Option value="social">Social</Option>
            <Option value="hindi">Hindi</Option>
            <Option value="telugu">Telugu</Option>

          </Select>
        </div>
        <div className="submit-button-container">
          <button type="submit" >
            Submit
          </button>
        </div>
        </form>
      </Card>
    </div>
    </div>
  );
};

export default Studymaterials;
