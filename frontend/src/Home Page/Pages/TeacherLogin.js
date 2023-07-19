import React, { useState, useContext, useEffect } from "react";

import BackgroundImage from "./login.webp";
import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Shared/Context/Auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import { useForm } from "../../Shared/Hooks/form-hook";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import Input from "../../Shared/Components/FormElements/Input";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../Shared/util/validators";


const TeacherLogin = () => {
 const navigate=useNavigate()
  
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:4444/api/joshua/authentication/teacher/login",
        "POST",
        JSON.stringify({
          email:formState.inputs.email.value,
          password:formState.inputs.password.value,
        }),
        {
          "Content-Type":"application/json",
        }
      );
      auth.login(responseData.userId,responseData.token)
      navigate("/")
      console.log(responseData)
    } catch (err) {}
  };
  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
    <div
      className="containe"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {isLoading && <LoadingSpinner asOverlay />}
      <h1 className="login-title">Log-In</h1>
      <br />
      <form onSubmit={authSubmitHandler}>
      <div className="login-form">
      <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
      </div>
      
        <button type="submit" className="login-button" >
          Login
        </button>
        </form>

       
      

    </div>
    </React.Fragment>
  );
};

export default TeacherLogin;
