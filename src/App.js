import "./App.css";
import Ap from "./ap";
import Product from "./Product";
import {Routes, Route,  useNavigate, unstable_HistoryRouter } from "react-router-dom";

import Login from "./formControl/login";
import Signup from "./formControl/signup";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import {  selectUser  } from './features/userSlice';

import { useEffect } from "react";
import PaymentPage from "./formControl/paymentPage";
import DeliveryAddress from "./formControl/deliveryAddress";
import OrderSummary from "./formControl/orderSummary";
import Navbar from "./Components/navbar";
import OrderDetails from "./formControl/orderDetails";
import PaymentForm from "./formControl/paymentForm";




function App() {
       
  const dispatch = useDispatch();
  const  users = useSelector(selectUser);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if(user===null|| user===""){
  //     navigate("/")
      
  //   }
    
  // },[])
 
  // const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (!users) {
      // Redirect to the home page or any other desired route
      navigate('/login');
    } 
  }, [users]);
  
 
  


   
  return (
    <>  
    
    
    <ToastContainer/>
     
        <Routes>
     {/* { user ? <Route path="/product" element={<Ap />} /> : <Route path="/" element={<Login />} /> }     */}
           {/* { user ? navigate("./Product")  : navigate("../") }    */}
           {/* <Route path="/" element={<Login />} /> */}
           
           <Route   path="/home" element={<Ap />} />
           <Route   path="/" element={<Ap />} />
           {/* <Route  path="/navbar" element={<Navbar />} /> */}
          <Route  path="/home/:id" element={<Product />} />
          
          <Route   path="/login" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
          <Route  path="/payment-page" element={<PaymentPage />} />
          <Route  path="/address" element={<DeliveryAddress />} />
          <Route  path="/order-summary" element={<OrderSummary/>} />
          <Route  path="/order-details" element={<OrderDetails/>} />
          <Route  path="/payment-form" element={<PaymentForm/>} />
          
        </Routes>  
     
    </>
  );
}

export default App;
