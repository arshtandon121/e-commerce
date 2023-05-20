import React, { useEffect } from 'react'
import ProductsApi from "./ProductsApi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import Navbar from './Components/navbar';

const Ap = () => {
  const  user = useSelector(selectUser);

  
//   const dispatch = useDispatch();
 const naviagte = useNavigate();
  
//  const handleLogout = (e) => {
//       e.preventDefault();
//       dispatch(logout());
//       if(user ===null){
//         // naviagte("../");
//       }
//  }
//  useEffect(()=>{
//     let email = sessionStorage.getItem('email');
  
//     if(email==='' ||email===null){
//       naviagte("../"); 
//     }
//  },[]);

useEffect(()=>{
  if(user ===null){
    naviagte("../login");
  }
}
,);

  return (
   <>
    <Navbar/>
  
  

  
  <div className="">
    <div className="elements grid grid-flow-row grid-cols-4 grid-rows-30 gap-1 mt-16  text-center  ">
     
 <ProductsApi /> 
     
    </div>
  </div>


  
  
   
   
   </>

   
  )

  
    
}

export default Ap