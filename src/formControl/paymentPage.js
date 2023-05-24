import { Box, Button, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Select,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// for all options
const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [additionalOption, setAdditionalOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    
  };

  const navigate = useNavigate()

  const handleAdditionalOptionChange = (event) => {
    setAdditionalOption(event.target.value);
    navigate("/order-details") 
    
  };

  // for credit/debit/atm card

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the submission of payment details
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);

    // Handle the submission of selected option
    console.log("Selected Option:", selectedOption);
  };

  return (
    <Box       textAlign={"center"} sx={{
     
    }
      
    }>
      <Box>

      <Typography fontFamily={"inherit"} fontSize={"40px"} color={"blue"} >Payment GateWay</Typography>
      </Box>
      <Box display={"flex"} alignContent={"center" } justifyContent={"center"}  > 

      
      <Box display={"flex"} alignContent={"center" } justifyContent={"center"}  sx={{
        border:"2px solid blue",
        height:"60%",
        width:"38%",
        marginTop:"120px",
        borderRadius:"6px"
        
        
      }} >
        <FormControl component="fieldset">
          <RadioGroup
            name="payemntOptions"
            value={selectedOption}
            onChange={handleOptionChange}
            defaultValue="option1"
          >
            <FormControlLabel value="option1" control={<Radio />} label="UPI" />
            {selectedOption === "option1" && (
              <Box>
                <TextField
                  label="Enter UPI ID "
                  value={additionalOption}
                  onChange={handleAdditionalOptionChange}
                  fullWidth
                />
                <Button sx={{ marginTop: "5px" }} variant="contained">
                  Proceed
                </Button>
              </Box>
            )}

            <FormControlLabel
              value="option2"
              control={<Radio />}
              label="Credit/Debit/ATM Card"
            />
            {selectedOption === "option2" && (
              <Box  display={"contents"}   sx={{
               
                height:"60%",
                width:"137%"
                
              }} >
                <TextField
                  label="Card Number"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  
                  required
                  sx={{ marginTop: "7px", marginBottom: "7px" }}
                />

                <TextField
                  label="Expiry Date (MM/YY)"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  
                  required
                  sx={{ marginTop: "7px", marginBottom: "7px" }}
                />

                <TextField
                  label="CVV"
                  value={cvv}
                  onChange={handleCVVChange}
                  
                  required
                  sx={{ marginTop: "7px", marginBottom: "7px" }}
                />

                <Button
                  variant="contained"
                  value={additionalOption}
                  onClick={handleAdditionalOptionChange}
                >
                 Pay
                </Button>
              </Box>
            )}

            <FormControlLabel
              value="option3"
              control={<Radio />}
              label="Net Banking"
            />
            {selectedOption === "option3" && (
              
                <FormControl>
                  <InputLabel>Select Option</InputLabel>
                  <Select value={additionalOption} onChange={handleOptionChange}>
                    <MenuItem value="option6">SBI Bank</MenuItem>
                    <MenuItem value="option5">PNB Bank</MenuItem>
                    <MenuItem value="option4">ICIC Bank</MenuItem>
                  </Select>
                </FormControl>

               
              
            )}

            <FormControlLabel
              value="option4"
              control={<Radio />}
              label="Cash on Delivery"
            />
              {selectedOption === "option4" && (
              
            

             
            
              <Button
              variant="contained"
              value={additionalOption}
              onClick={handleAdditionalOptionChange}
             sx={{
              marginTop:"7px"
             }}
            >
              Proceed
            </Button>
          )}
          </RadioGroup>
        </FormControl>
      </Box>

     
    </Box>
    </Box>
  );
};
export default PaymentPage;
