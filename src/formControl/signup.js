import React, { useEffect, useState } from "react";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Paper,
  Box,
  Typography,
  Input,
  Alert,
  Stack,
} from "@mui/material";

import "../LoginSignup.css";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Validations

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Signup() {
  // For shiifting login singup
  const handlecheck = () => {
    naviagte("/");
  };
  const naviagte = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  // toast function

  const notify = () => {
    toast.success("Sucess", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Inputs
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  //  Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // show password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Checkbox
  // const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    // console.log( "email : "+isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlure Phone
  const handlePhone = () => {
    if (!phoneInput || phoneInput.length < 10) {
      setPhoneError(true);

      return;
    }

    setPhoneError(false);
  };

  // on change for phone enter only number
  const handleChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhoneInput(e.target.value);
    }
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

    // IF username error is true
    if (usernameError || !usernameInput) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If phone error is true
    if (phoneError || !phoneInput) {
      setFormValid("phone is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput || passwordInput.trim() === "") {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    // console.log("Username : " + usernameInput);
    // console.log("Email : " + emailInput);
    // console.log("Phone : " + phoneInput);
    // console.log("Password : " + passwordInput);

    let regobj = { emailInput, usernameInput, phoneInput, passwordInput };
    console.log(regobj);
        
       
       

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => {
        setSuccess("Form  Submitted Successfully");
        notify();

        naviagte("/");
      })
      .catch((err) => {
        setFormValid("error" + err);
      });

    //Show Successfull Submittion
  };

  return (
    <>
      <ToastContainer />

      <div className="App">
        <Paper
          elevation={10}
          style={{ padding: "10px", paddingBottom: "50px" }}
        >
          <div align="center">
            <Box>
              <Typography fontSize={35} color={"blue"}>
                Signup
              </Typography>
            </Box>
          </div>
          <div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                error={usernameError}
                label="Username"
                id="standard-basic-1"
                variant="standard"
                sx={{ width: "100%" }}
                size="small"
                value={usernameInput}
                InputProps={{}}
                onChange={(event) => {
                  setUsernameInput(event.target.value);
                }}
                onBlur={handleUsername}
              />
            </div>

            <div style={{ marginTop: "5px" }}>
              <TextField
                label="Email Address"
                fullWidth
                error={emailError}
                id="standard-basic"
                variant="standard"
                sx={{ width: "100%" }}
                value={emailInput}
                InputProps={{}}
                size="small"
                onBlur={handleEmail}
                onChange={(event) => {
                  setEmailInput(event.target.value);
                }}
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <TextField
                type="type"
                error={phoneError}
                label="Phone-Number"
                id="standard-basic-2"
                variant="standard"
                sx={{ width: "100%" }}
                size="small"
                value={phoneInput}
                inputProps={{ maxLength: 10 }}
                onChange={(event) => {
                  handleChange(event);
                }}
                onBlur={handlePhone}
              />
            </div>

            <div style={{ marginTop: "5px" }}>
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel
                  error={passwordError}
                  htmlFor="standard-adornment-password"
                >
                  Password
                </InputLabel>
                <Input
                  error={passwordError}
                  onBlur={handlePassword}
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => {
                    setPasswordInput(event.target.value);
                  }}
                  value={passwordInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>

            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<LoginIcon />}
                onClick={handleSubmit}
              >
                SIGNUP
              </Button>
            </div>

            {/* Show Form Error if any */}
            {formValid && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error" size="small">
                  {formValid}
                </Alert>
              </Stack>
            )}

            {/* Show Success if no issues */}
            {success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success" size="small">
                  {success}
                </Alert>
              </Stack>
            )}

            <div
              style={{ marginBottom: "7px", fontSize: "10px" }}
              margin="left"
            >
              <br />
              Already have an account ?{" "}
            </div>
          </div>
          <Button variant="contained">
            <Link to="/">Login</Link>
          </Button>
        </Paper>
      </div>
    </>
  );
}
