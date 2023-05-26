import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const PaymentForm = () => {
  const handleToken = (token) => {
    // Handle the token received from Stripe API
    if(token){
        console.log("success")
    }
    console.log(token);
  };


  return (
    <StripeCheckout
      token={handleToken}
      stripeKey="pk_test_51NBwYuSHdcE5jiLGuXgGSd0dY4D5kmmjdanZF1j2wUjcy6yf62aRrgREMWqAgozs2MCF08bCdHR50nOURF4YFpcF00smDHL732"
      amount={1000} // Amount in cents
      currency="USD"
      name="My Store"
      description="Example Purchase"
    >
      <button type="button">Pay with Card</button>
      <p>hello</p>
    </StripeCheckout>
  )
}

export default PaymentForm