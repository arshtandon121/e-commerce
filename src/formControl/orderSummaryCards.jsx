import { Add, Cancel, Delete } from "@mui/icons-material";
import { Box, Button, ListItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';


const OrderSummaryCards = ({ cartitem , reload ,  cartPrice , setCartPrice , fetchCartProducts}) => {

  

  
  
  

  
   useEffect(()=>{
     fetch(`http://localhost:8000/cart/${cartitem.id}`).then((res)=>{
      return res.json();
    }).then((resp)=>{
        
         setValue(resp.quantity)
         
         
      })
    },[])

  
      
   

    
  
    const [value, setValue] = useState(0)
    const [buttonDisable, setButtonDisable] = useState(true)
   
    const [specificPrice, setSpecificPrice] = useState(cartitem.price)
  
     // update quantity

  const updateCartItem = async (Id, quantity) => {
    try {
      const response = await fetch(`http://localhost:8000/cart/${Id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
         
        // console.log('Cart item updated successfully');
      } else {
        // console.log('Failed to update cart item');
      }
    } catch (error) {
      console.log('Error updating cart item:', error);
    }
  };

  // delete a card 

  const deleteCartItem = async (Id) => {
    try {
      const response = await fetch(`http://localhost:8000/cart/${Id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCartProducts()
        // console.log('Cart item deleted successfully');
      } else {
        // console.log('Failed to delete cart item');
      }
    } catch (error) {
      // console.log('Error deleting cart item:', error); 
    }
  };

 // direct delete card

 const handleDelete=()=>{
  deleteCartItem(cartitem.id)
 }


  useEffect(()=>{
      fetchCartProducts()
      reload()
      if(value>1){
        setButtonDisable(false)
      }
       
      

  },[value])

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
    updateCartItem(cartitem.id,value+1)
    
    setSpecificPrice(cartitem.price)
    setCartPrice(cartPrice+specificPrice)
    
   
   
    

  };

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(1, prevValue - 1));
    updateCartItem(cartitem.id,value-1)
   
    setSpecificPrice(cartitem.price)
    setCartPrice(cartPrice-specificPrice)
   
    if(value-1<2){
      setButtonDisable(true)
    }
  };

  return (
    <Box
      display={"flex"}
      marginTop={"0px"}
      marginRight={"5px"}
      marginLeft={"49px"}
      marginBottom={"50px"}
      flexDirection={"row"}
      sx={{
        boxShadow: "7px 7px 14px -5px rgba(0,0,0,0.75)",
        borderRadius: "7px",
      }}
    >
      <Box
        sx={{
          height: "objectFit",
          width: "578px",
          objectFit: "fill",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"

        }}
      >
        <img src={cartitem.thumbnail} height={"100px"} />
      </Box>
      <ListItem>{cartitem.title}</ListItem>
      <ListItem sx={{fontSize:"13px"}}  >{cartitem.description}</ListItem>
      <ListItem  >{cartitem.price} RS/-</ListItem>
      <Box display={"flex"} flexDirection={"row"} component="form" marginRight={"2px"} autoComplete="off">
        <Button  sx={{width:"78px"}}  disabled={buttonDisable}   endIcon={<Delete />} onClick={handleDecrement}></Button>
       <Box display={"flex"}  sx={ { justifyContent:"center", alignItems:"center"  ,  textAlign:"center" , width:"63px"}} >

        <TextField
          
          type="number"
          id="Quantity"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          InputProps={{
            readOnly: true,
            min: 0,
            max: 10,
          }}
          ></TextField>

          </Box>
        <Button  sx={{width:"0px"}}  endIcon={<Add />} onClick={handleIncrement}></Button>
      </Box>
       <Box>
        <Button sx={{color:"red"}} onClick={handleDelete} endIcon={<CancelIcon/>} ></Button>
       </Box>
          </Box>
  );
};

export default OrderSummaryCards;
