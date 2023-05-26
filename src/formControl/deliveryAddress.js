import React, { useEffect, useState } from "react";
import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  listitem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/navbar";

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(false);

  // for selecting between new and existing address
  const [selectedOption, setSelectedOption] = useState("new");
  const [selectedOption1, setSelectedOption1] = useState(0);

  // for getting selected value

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    // setting values for states in function
    setdfn(EA[selectedOption1].firstName);
    setdln(EA[selectedOption1].lastName);
    setdci(EA[selectedOption1].city);
    setds(EA[selectedOption1].state);
    setco(EA[selectedOption1].country);
    setpr(EA[selectedOption1].postalCode);
    setcrpr(localStorage.getItem("cartPrice"));
    setuID(userID);
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
  const [userID, setUserID] = useState(localStorage.getItem("UserID"));

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
  const [fN, setFN] = useState(false);
  const [lN, setLN] = useState(false);
  const [aL1, setAL1] = useState(false);
  const [sE, setSE] = useState(false);
  const [cE, setCE] = useState(false);
  const [cI, setCI] = useState(false);
  const [pC, setPC] = useState(false);

  // for adding address in database

  let regobj = {
    userID,
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    state,
    city,
    country,
    postalCode,
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (form) {
      fetch("http://localhost:8000/address", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
      
          setFirstName(" ");
          setLastName(" ");
          setAddressLine1(" ");
          setAddressLine2(" ");
          setCity(" ");
          setState(" ");
          setCountry(" ");
          setPostalCode(" ");

          setSelectedOption("existing");
        })
        .catch((err) => {
          console.log("error" + err);
        });
    } else {
      notify("Fill complete information");
    }
  };

  // for getting the existing address stored in db

  const [allAddresses, setAllAddresses] = useState();
  const [cart, setCart] = useState();
  let existingAddresses = [];

  var flag = 0;

  const matchedAddresses = (resp) => {
    if (flag == 0) {
      for (let i = 0; i < resp.length; i++) {
        if (resp[i].userID == userID) {
          existingAddresses.push(resp[i]);
        }
      }

      flag++;
    }
    return existingAddresses;
  };

  const [EA, setEA] = useState();

  useEffect(() => {
    fetch(`http://localhost:8000/address`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setAllAddresses(resp);
        setEA(matchedAddresses(resp));
      });
  }, [selectedOption]);

  useEffect(() => {
    fetch(`http://localhost:8000/cart`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setCart(resp);
      });
  }, []);

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

  const [dfn, setdfn] = useState();
  const [dln, setdln] = useState();
  const [dci, setdci] = useState();
  const [ds, setds] = useState();
  const [co, setco] = useState();
  const [pr, setpr] = useState();
  const [crpr, setcrpr] = useState();
  const [uID, setuID] = useState();

  console.log(localStorage.getItem("cartPrice"));

  let Pid = 0;
  const ExistingSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].userID == userID) {
        Pid = i;
      }
    }

    const Products = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].userID == userID) {
        Products.push(cart[i]);
      }
    }
    console.log(Products);

    setdfn(EA[selectedOption1].firstName);
    setdln(EA[selectedOption1].lastName);
    setdci(EA[selectedOption1].city);
    setds(EA[selectedOption1].state);
    setco(EA[selectedOption1].country);
    setpr(EA[selectedOption1].postalCode);
    setcrpr(localStorage.getItem("cartPrice"));
    setuID(userID);

    const order = {dfn, dln, dci, ds, co, pr, crpr, uID, Products};
    

    console.log(cart);
    if (selectedOption1 === "") {
      notify("Select from options ");
    } else {
      console.log(order);
      
      fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((res) => {
          navigate("../payment-form");
         
        })
        .catch((err) => {
          console.log("error" + err);
        });
      
    }
  };

  useEffect(() => {
    if (fN && lN && aL1 && pC && cE && sE && cI) {
      setForm(true);
    }
  }, [handleClick]);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        if (firstName.length < 2 || firstName === "") {
          setFirstNameError(true);
          notify("First Name can't be Empty or Less Than 3 Characters");
        } else {
          setFirstNameError(false);
          setFN(true);
        }
        break;

      case "lastName":
        if (lastName.length < 2 || lastName === "") {
          setLastNameError(true);
          notify("Last Name can't be Empty or Less Than 3 Characters");
        } else {
          setLastNameError(false);
          setLN(true);
        }
        break;

      case "addressLine1":
        if (addressLine1 === "") {
          setAddressLine1Error(true);
          notify("Address Field can't be Empty ");
        } else {
          setAddressLine1Error(false);
          setAL1(true);
        }
        break;

      case "postalCode":
        if (postalCode === "" || postalCode.length < 6) {
          setPostalCodeError(true);
          notify("Postal-Code can't be empty or less than 6 digits");
        } else {
          setPostalCodeError(false);
          setPC(true);
        }
        break;

      case "city":
        if (city === "") {
          setCityError(true);
          notify("City can't be empty ");
        } else {
          setCityError(false);
          setCI(true);
        }
        break;

      case "state":
        if (state === "") {
          setStateError(true);
          notify("State can't be empty ");
        } else {
          setStateError(false);
          setSE(true);
        }
        break;

      case "country":
        if (country === "") {
          setCountryError(true);
          notify("Country can't be empty ");
        } else {
          setCountryError(false);
          setCE(true);
        }
        break;

      default:
    }
  };

  return (
    <>
      <Navbar />
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
          marginTop={"2rem"}
          sx={{
            height: "30%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "42%",
              height: "70%",
              marginRight: "1%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              borderRadius: "6px",
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
              },
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
            <Box
              marginTop={"1rem"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
              borderRadius={"6px"}
            >
              <Grid
                item
                xs={5}
                sx={{
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  borderRadius: "6px",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                  },
                  height: "100%",
                  paddingRight: "1rem",
                  paddingLeft: "1rem",
                }}
              >
                <Typography
                  sx={{ color: "blue", padding: "10px 0px 0px 17px" }}
                  id="demo-radio-buttons-group-label"
                >
                  Add New Address
                </Typography>
                <listitem
                  sx={{
                    marginTop: 4,
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
                      Save Address
                    </Button>
                  </form>
                </listitem>
              </Grid>
            </Box>
          )}

          {selectedOption === "existing" && (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              width={"100%"}
            >
              <Grid
                listitem
                xl={5}
                width={"100%"}
                sx={{
                  marginTop: "1rem",
                  height: "fit-content",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  borderRadius: "6px",
                  paddingLeft: "2rem",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                  },
                }}
              >
                <listItem>
                  <FormControl>
                    <FormLabel
                      sx={{ color: "blue", padding: "10px 0px 0px 0px" }}
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
                      {EA.map((item, index) => (
                        <FormControlLabel
                          value={index}
                          control={<Radio />}
                          label={
                            item.firstName +
                            " " +
                            item.lastName +
                            " " +
                            item.city +
                            " " +
                            item.state +
                            " " +
                            item.country +
                            " " +
                            item.postalCode
                          }
                          sx={{
                            paddingTop: "16px",
                          }}
                        />
                      ))}
                    </RadioGroup>
                    <Button
                      onClick={(e) => ExistingSubmit(e)}
                      variant="contained"
                      fullWidth
                      sx={{
                        marginTop: 4,
                        marginBottom: 2,
                      }}
                      startIcon={<Save />}
                    >
                      Continue
                    </Button>
                  </FormControl>
                </listItem>
              </Grid>
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default DeliveryAddress;
