import React, { useState } from "react";


import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
} from "@mui/material";
import { Box, Paper , Typography } from "@mui/material";
import '../LoginSignup.css'
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);



export default function Login() {
  const naviagte = useNavigate()
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);


  // context slice




   


  //Inputs
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState();

  


  const notify=()=>{
    toast.success('Login Success', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }


  // Inputs Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  const handleEmail = () => {
    // console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
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

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput || passwordInput.trim()==="") {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    // console.log("Email : " + emailInput);
    // console.log("Password : " + passwordInput);
    // console.log("Remember : " + rememberMe);

    fetch(`http://localhost:8000/users/`).then((res)=>{
      return res.json();
    }).then((resp)=>{
      

     
      
     
      
      if (resp) {
        // Compare credentials
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].emailInput === emailInput && resp[i].passwordInput === passwordInput) {
            // Grant access
            localStorage.setItem('UserID', JSON.stringify(resp[i].id));
            console.log( localStorage.getItem('UserID'))
            // sessionStorage.setItem('email',emailInput);
             dispatch(login({
              email:emailInput,
              password:passwordInput,
              loggedIn:true,
             }));
            setSuccess("Form Submitted Successfully");
            notify()
            naviagte("/home")
            return;
          }
        }
        // Deny access
        setFormValid(
          "Invalid Email/Password"
        );
      }
       
      
    })


    
    //Show Successfull Submittion
  };

  return (
    <div className="App">
        <Paper  elevation={10}  style={{ padding: "10px", paddingBottom: "50px"  }}>
          <div align="center">
           <Box>
             <Typography  fontSize={35} color={"blue"}>
               Login 
             </Typography>
           </Box>
          </div>
    <div>
      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          error={emailError}
         
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

      <div style={{ fontSize: "10px" }}>
        <Checkbox
          {...label}
          size="small"
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember Me
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleSubmit}
        >
          LOGIN
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

      <div style={{ marginBottom: "7px", marginTop: "7px", fontSize: "10px" }} margin="left">
        <p>Forgot Password</p>
        <br />
        Do you have an account ?{" "}
        
      </div>
    </div>
    <Button
            variant="contained"
           
          >
             <Link to="/Signup">Signup</Link>
          </Button>
        </Paper>
      </div>
  );
}
