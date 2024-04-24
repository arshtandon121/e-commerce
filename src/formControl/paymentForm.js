import { Box, Button } from '@mui/material';
import React, { useState }   from 'react'
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = () => {
    
  

    const paymentFailed = () => {
        toast.error("Payment Failed", {
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

      const paymentSuccess = () => {
        toast.success("Payment Received", {
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


      const deleteCartItem = async (userID) => {
        try {
          const response = await fetch(`http://localhost:8000/cart/${userID}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
           
            console.log('Cart item deleted successfully');
          } else {
            console.log('Failed to delete cart item');
          }
        } catch (error) {
          // console.log('Error deleting cart item:', error); 
        }
      };



 const order =  JSON.parse(localStorage.getItem('orders'));
    const navigate = useNavigate()
  const handleToken = (token) => {
    // Handle the token received from Stripe API
    if(token){
        const newItem = token; // Replace 'New Item' with the item you want to push

       
        
        fetch("http://localhost:8000/orders", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(order),
          })
            .then((res) => {
                paymentSuccess()
                
             deleteCartItem(localStorage.getItem('UserID'));
                navigate("../order-details")

                
            })
            .catch((err) => {
                console.log("error" + err);
            });
           

    }
    else {
    paymentFailed()
    }
    console.log(token);
  };
 

  return (
    <StripeCheckout
      token={handleToken}
      stripeKey="pk_test_51NBwYuSHdcE5jiLGuXgGSd0dY4D5kmmjdanZF1j2wUjcy6yf62aRrgREMWqAgozs2MCF08bCdHR50nOURF4YFpcF00smDHL732"
      amount={localStorage.getItem('cartPrice')+"00"} // Amount in cents
      currency="INR"
      name="My Store"
      description="Example Purchase"
    >
      <Box width={'100%'}  height={"44rem"}  display={"flex"} alignItems={"center"} justifyContent={"center"} >
      <Button sx={{width:"15%"}} variant='contained'>Pay Now</Button>
      </Box>
     
  
    </StripeCheckout>
  )
}

export default PaymentForm