import {
  Grid,
  ListItem,
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React, { Fragment, useState, useEffect } from "react";
import img1 from "../nord-buds-ce-oneplus-original-imagfyk4hyvgg6ze.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Navbar from "../Components/navbar";
import { useActionData, useNavigate } from "react-router-dom";
import OrderSummaryCards from "./orderSummaryCards";
import { current } from "@reduxjs/toolkit";

const OrderSummary = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("../address");
  };

  // for fetching the cart items

  const [cartProducts, setCartProducts] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false)


  var [cartPrice, setCartPrice] = useState(0);
  

  const fetchCartProducts = () => {
    fetch(`http://localhost:8000/cart`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
       
        setCartProducts(resp);
       
      });
  };

  useEffect(() => {
    fetchCartProducts();
    if(cartPrice<0){
      setCartPrice(0)
      
    }
    
  }, []);

  useEffect(() => {
    cartValue();
    
  }, [cartProducts, cartProducts.quantity]);






  const cartValue = () => {
    var cartPr = 0;

    for (var i = 0; i < userProducts.length; i++) {
      cartPr += userProducts[i].price * userProducts[i].quantity;
      
     
    }
    localStorage.setItem('cartPrice', cartPr);
    // console.log(cartPr);
    setCartPrice(cartPr);
    // console.log(cartPrice);

    if(cartPr>0){
      setButtonDisabled(false)
    }else{

      setButtonDisabled(true)
    }
    
  };




  const updatedValue=()=>{
      setCartPrice(cartPrice)
      
  }


  // for filterng Products 
  var userProducts =[];

  for(var i=0; i<cartProducts.length; i++){
    if(cartProducts[i].userID==localStorage.getItem('UserID')){
      userProducts.push(cartProducts[i])
    }
   
  }
 

  return (
    <>
      <Navbar />
      <Box>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            justifyContent: "center",

            height: "100px",
            width: "100%",
          }}
        >
          <Typography fontSize={"35px"}> OrderSummary</Typography>
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            height: "full",
            width: "inherit",
          }}
        >
          <Grid item xs={8}>

          


            {userProducts.map((cartitem) => (
              
              <Fragment key={cartitem.id}>
               
                <OrderSummaryCards cartitem={cartitem} fetchCartProducts={fetchCartProducts} reload={updatedValue}  cartPrice={cartPrice} setCartPrice={setCartPrice}/>
              </Fragment>
            ))}
          </Grid>
          {/* <_________________________________________--------------------------------------_____________________________> */}

          <Grid item xs>
            <Box>
              <Box
                sx={{
                  height: "auto",
                  width: "32%",

                  position: "fixed",
                  margin: "0px 20px 10px 10px",

                  boxShadow: "7px 7px 14px -5px rgba(0,0,0,0.75)",
                  borderRadius: "7px",
                }}
              >
                <Typography
                  sx={{
                    borderBottomWidth: 2,
                    marginLeft: "5%",
                    marginRight: "5%",
                  }}
                  fontSize={"30px"}
                  textAlign={"center"}
                >
                  Price Details
                </Typography>

                <Box>
                  <Grid
                    container
                    spacing={1}
                    marginTop={"0px"}
                    marginLeft={"0px"}
                  >
                    <Grid
                      item
                      xs={7}
                      margin={"20px"}
                      padding={"10px 0px 10px 29px "}
                    >
                      <Typography fontSize={"20px"} margin={"8px 0px 8px 0px "}>
                        Price({cartProducts.length} items)
                      </Typography>
                      <Typography fontSize={"20px"} margin={"8px 0px 8px 0px "}>
                        Delivery Charges
                      </Typography>
                      <Typography
                        fontSize={"20px"}
                        margin={"20px 0px 8px 0px "}
                      >
                        Total Payable
                      </Typography>
                      <Typography
                        color={"green"}
                        fontSize={"15px"}
                        margin={"20px 0px 8px 0px "}
                      >
                        {/* You Save Total 349 RS on this Order */}
                      </Typography>
                    </Grid>
                    <Grid item xs margin={"20px"} padding={"0px 0px 0px 2px "}>
                      <Typography fontSize={"20px"} margin={"8px 0px 8px 0px "}>
                        {cartPrice} RS
                      </Typography>
                      <Typography fontSize={"20px"} margin={"8px 0px 8px 0px "}>
                       {cartProducts.length?  "49 RS" : " 0 RS"}  
                      </Typography>
                      <Typography
                        fontSize={"20px"}
                        margin={"20px 0px 8px 0px "}
                      >
                         {cartProducts.length? cartPrice + 49+ "RS"  : " 0 RS"} 
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  width={"250px"}
                  position={"relative"}
                  margin={"0px 0px 15px 0px"}
                  textAlign={"center"}
                >
                  <Button onClick={handleClick} disabled={buttonDisabled} variant="contained">
                    {" "}
                    Proceed to Pay{" "}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderSummary;
