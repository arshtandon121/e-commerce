import React, { useEffect, useState } from "react";
import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";











const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(false);

  // for selecting between new and existing address
  const [selectedOption, setSelectedOption] = useState("new");
  const [selectedOption1, setSelectedOption1] = useState("");
  
  // for getting selected value 
  


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  // take inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // handle errors

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressLine1Error, setAddressLine1Error] = useState(false);
  const [addressLine2Error, setAddressLine2Error] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);


  // for form validate 
  const [fN, setFN] = useState(false)
  const [lN, setLN] = useState(false)
  const [aL1, setAL1] = useState(false)
  const [sE, setSE] = useState(false)
  const [cE, setCE] = useState(false)
  const [cI, setCI] = useState(false)
  const [pC, setPC] = useState(false)

  const handleClick = (e) => {
    e.preventDefault();
    console.log(form)
    if (form) {
      console.log({
        " firstName": firstName,
        lastName: lastName,
        "addressline1 ": addressLine1,
        addressline2: addressLine2,
        state: state,
        " city": city,
        postalCode: postalCode,
        country: country,
      });

      navigate("../payment-page");
    } else {
      notify("Fill complete information");
    }
  };

  // for errors toasts

  const notify = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handlePostalCode = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPostalCode(e.target.value);
    }
  };


 const ExistingSubmit=(e)=>{
  e.preventDefault()

 console.log(selectedOption1)
  }


  useEffect(()=>{
    if(fN && lN && aL1 && pC && cE && sE && cI){

      setForm(true);
      console.log(form);
    }
  },[handleClick])

  const handleChange = (e) => {
    switch (e.target.name) {

      case "firstName":
        if (firstName.length < 2 || firstName === "") {
          setFirstNameError(true);
          notify("First Name can't be Empty or Less Than 3 Characters");
        } else {setFirstNameError(false)
          setFN(true)
          }
        break;


      case "lastName":
        if (lastName.length < 2 || lastName === "") {
          setLastNameError(true);
          notify("Last Name can't be Empty or Less Than 3 Characters");
        } else {setLastNameError(false)
          setLN(true)
        }
        break;

      case "addressLine1":
        if (addressLine1 === "") {
          setAddressLine1Error(true);
          notify("Address Field can't be Empty ");
        } else {
          setAddressLine1Error(false);
          setAL1(true)
        }
        break;

      case "postalCode":
        if (postalCode === "" || postalCode.length < 6) {
          setPostalCodeError(true);
          notify("Postal-Code can't be empty or less than 6 digits");
        } else {setPostalCodeError(false);
          setPC(true)
        }
        break;

      case "city":
        if (city === "") {
          setCityError(true);
          notify("City can't be empty ");
        } else {
          setCityError(false);
          setCI(true)
        }
        break;

      case "state":
        if (state === "") {
          setStateError(true);
          notify("State can't be empty ");
        } else {
          setStateError(false);
          setSE(true)
        }
        break;

      case "country":
        if (country === "") {
          setCountryError(true);
          notify("Country can't be empty ");
        } else {
          setCountryError(false);
          setCE(true)
        }
        break;

      default:
       
      
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Box>
          <Typography
            display={"flex"}
            fontSize={35}
            color={"blue"}
            fontStyle={"initial"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              width: "full",
              height: "50px",
              marginTop: "10px",
            }}
          >
            Delivery Address
          </Typography>
        </Box>

        <Box
          display={"flex"}
          marginTop={"4rem"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form>
            <RadioGroup
              aria-label="address-option"
              name="address-option"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <FormControlLabel
                value="new"
                control={<Radio />}
                label="Enter New Address"
              />
              <FormControlLabel
                value="existing"
                control={<Radio />}
                label="Choose Existing Address"
              />
            </RadioGroup>
          </form>
        </Box>
        

        
        <Grid
          container
          spacing={1}
          sx={{
            height: "full",
            width: "inherit",
          }}
        >
          {selectedOption === "new" && (
             <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}> 
            <Grid item xs={7} textAlign={"center"}>
              <ListItem
                sx={{
                  marginTop: 7,
                }}
              >
                <form noValidate autoComplete="on">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="First Name"
                        error={firstNameError}
                        variant="outlined"
                        name="firstName"
                        value={firstName}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Last Name"
                        name="lastName"
                        error={lastNameError}
                        value={lastName}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setLastName(e.target.value)}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Address line 1"
                        error={addressLine1Error}
                        variant="outlined"
                        fullWidth
                        name="addressLine1"
                        value={addressLine1}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setAddressLine1(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Address line 2"
                        error={addressLine2Error}
                        variant="outlined"
                        fullWidth
                        name="addressLine2"
                        value={addressLine2}
                        // onBlur={(e) => handleChange(e)}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Postal/Zip Code"
                        error={postalCodeError}
                        variant="outlined"
                        fullWidth
                        inputProps={{ maxLength: 6 }}
                        name="postalCode"
                        value={postalCode}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => handlePostalCode(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="City"
                        error={cityError}
                        variant="outlined"
                        fullWidth
                        name="city"
                        value={city}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Province/State"
                        error={stateError}
                        variant="outlined"
                        fullWidth
                        name="state"
                        value={state}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        label="Country"
                        error={countryError}
                        variant="outlined"
                        fullWidth
                        name="country"
                        value={country}
                        onBlur={(e) => handleChange(e)}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    onClick={handleClick}
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: 4,
                    }}
                    startIcon={<Save />}
                  >
                    Continue
                  </Button>
                </form>
              </ListItem>
            </Grid>
            </Box>
          )}

          {selectedOption === "existing" && (
            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} width={"100%"}>

            
            <Grid ListItem xl={5}  >
              <ListItem
                sx={{
                  marginTop: 9,
                  border: " 2px solid #1797B1",
                  borderRadius: "6px",
                  height: "fit-content",
                }}
              >
                <FormControl >
                  <FormLabel
                    sx={{ color: "blue", padding: "2px 0px 10px 0px" }}
                    id="demo-radio-buttons-group-label"
                  >
                    Existing Address
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="none"
                    name="radio-buttons-group"
                    value={selectedOption1}
                    onChange={handleOptionChange1}
                  >
                    <FormControlLabel
                      value="address1"
                      control={<Radio />}
                      label ="Cecilia Chapman
                           711-2880 Nulla St.
                           Mankato Mississippi 96522
                           (257) 563-7401"
                      sx={{
                        paddingTop: "16px",
                      }}
                    />
                    <FormControlLabel
                      value="address2"
                      control={<Radio />}
                      label ="Iris Watson
                           P.O. Box 283 8562 Fusce Rd.
                           Frederick Nebraska 20620
                           (372) 587-2335"
                      sx={{
                        paddingTop: "16px",
                      }}
                    />
                    <FormControlLabel
                      value="address3"
                      control={<Radio />}
                      label="Celeste Slater
                           606-3727 Ullamcorper. Street
                           Roseville NH 11523
                           (786) 713-8616"
                      sx={{
                        paddingTop: "16px",
                      }}
                    />
                  </RadioGroup>
                  <Button
                    onClick={(e)=>ExistingSubmit(e)}
                    variant="contained"
                    fullWidth
                    sx={{
                      marginTop: 4,
                      marginBottom:2
                    }}
                    startIcon={<Save />}
                  >
                    Continue
                  </Button>
                </FormControl>
              </ListItem>
            </Grid>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default DeliveryAddress;
