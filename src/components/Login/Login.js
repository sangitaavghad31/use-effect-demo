// Write your code at relevant places in the code below:

import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.payload,
      isValid: action.payload.trim().length>6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid:state.value.trim().length>6
    }
  }
  return { value: "", isValid: false };
}

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  })
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", payload: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      payload: event.target.value
    })
    setFormIsValid(emailState.isValid && event.target.value.trim().length>6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

 return (
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <Card className="p-4 shadow" style={{ width: "400px" }}>
      <form onSubmit={submitHandler}>
        
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-Mail</label>
          <input
            type="email"
            id="email"
            className={`form-control ${
              emailState.isValid === false ? "is-invalid" : ""
            }`}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          {emailState.isValid === false && (
            <div className="invalid-feedback">
              Please enter a valid email.
            </div>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${
              passwordState.isValid === false ? "is-invalid" : ""
            }`}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
          {passwordState.isValid === false && (
            <div className="invalid-feedback">
              Password must be more than 6 characters.
            </div>
          )}
        </div>

        {/* Button */}
        <div className="d-grid">
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>

      </form>
    </Card>
  </div>
);
}

export default Login;
