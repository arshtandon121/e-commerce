import {
  Box,
  Grid,
  ListItem,
  Typography,
  responsiveFontSizes,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import img from "../formControl/1.jpg";
import tick from "../formControl/icons8-tick.gif";
import Navbar from "../Components/navbar";
const OrderDetails = () => {
  const [cartItems, setCartItems] = useState();
  const [sortCart1, setSortCart1] = useState();


  

  const UserID = localStorage.getItem("UserID");

  const UsersCart = [];

  

  useEffect(() => {
    // setCartItems(fetchCartProducts());
    fetch(`http://localhost:8000/orders`)
    .then((res) => {
      return res.json();
    })
    .then((resp) => {
      setCartItems(resp);
      console.log(resp);
      
      setSortCart1(sortCart(resp));
 

      return resp;
    });
  }, []);

  // const fetchCartProducts = () => {
   
  // };

  const sortCart = (resp) => {
    const UsersCart = [];
    if (UsersCart.length === 0) {
      for (let i = 0; i < resp.length; i++) {
        console.log("hell");
        if (UserID == resp[i].uID) {
          console.log(resp[i].uID);
          console.log(i);
          UsersCart.push(resp[i]);
          console.log(UsersCart);
        } else {
          console.log("hi");
        }
        // console.log(UsersCart)
      }
    }
    return UsersCart;
  };

  return (
    <div>
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
          <Typography fontSize={"35px"}> Order Section</Typography>
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
            
              {/* {console.log(sortCart1[0].Products.length)} */}
            {sortCart1 && sortCart1.length>0 && sortCart1[0].Products.map((item, index) => (
                         
              <Box
             
                       key={index}
                       display={"flex"}
                       marginTop={"4rem"}
                       marginRight={"5px"}
                       marginLeft={"49px"}
                       marginBottom={"50px"}
                       flexDirection={"row"}
                       sx={{
                         backgroundColor: "#fff",
                         boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                         borderRadius: "6px",
                         transition: "box-shadow 0.3s",
                         "&:hover": {
                           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                         },
                       }}
                     >
                       <Box
                         sx={{
                           height: "objectFit",
                           width: "578px",
                           objectFit: "fill",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                         }}
                       >
                         <img src={item.thumbnail} height={"100px"} />
                       </Box>
         
                       <ListItem>{item.title}</ListItem>
                       <ListItem sx={{ fontSize: "13px" }}>
                       {item.description}
                       </ListItem>
                       <ListItem>{item.price}RS/-</ListItem>
                       <ListItem>{item.quantity}</ListItem>
         
                       
                      
                     </Box>

                      ))}
          </Grid>

          <Grid item xs>
            <Box>
              <Box
                sx={{
                  height: "auto",
                  width: "32%",

                  position: "fixed",
                  margin: "0px 20px 10px 10px",

                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  borderRadius: "6px",
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)",
                  },
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
                  Order Received
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
                        Total Amount : {localStorage.getItem("cartPrice")}
                      </Typography>
                      <Typography fontSize={"20px"} margin={"8px 0px 8px 0px "}>
                        Delivery Date
                      </Typography>
                      <Typography
                        fontSize={"20px"}
                        margin={"20px 0px 8px 0px "}
                      > Delivery Address : 
                         {sortCart1 && sortCart1[0].dfn + " " +sortCart1[0].dln + " " +sortCart1[0].dci + " ," +sortCart1[0].ds+ " ," +sortCart1[0].co}
                       
                      </Typography>
                      <Typography
                        color={"green"}
                        fontSize={"15px"}
                        margin={"20px 0px 8px 0px "}
                      >
                        {/* You Save Total 349 RS on this Order */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  width={"250px"}
                  position={"relative"}
                  margin={"0px 0px 15px 0px"}
                  textAlign={"center"}
                ></Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
   </div>
  );
};

export default OrderDetails;
