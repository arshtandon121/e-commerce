import { ShoppingCart } from '@mui/icons-material'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {


    const  user = useSelector(selectUser);

  
    const dispatch = useDispatch();
   const navigate = useNavigate();
    
   const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        
   }

//    useEffect(()=>{
//       if(user ===null){
//         navigate("../");
//       }
//     }
//     ,);

const clicked=()=>{
    navigate("../home")
}

const goToCart=()=>{
    navigate("../order-summary")
}




  return (
   <AppBar position='sticky' >
    <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' >
            <StoreSharpIcon/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{flexGrow:'1'}} >
            Demo Store
        </Typography>
        <Stack direction="row" spacing='2'  >
            <Button onClick={clicked} sx={{margin:"0px 13px 0px 13px" , padding: "12px 14px" }} startIcon={<HomeIcon/>} color='inherit'>Home</Button>
            
            <Button onClick={goToCart} sx={{margin:"0px 13px 0px 13px" , padding: "12px 14px"}} startIcon={<ShoppingCart/>} color='inherit'>Cart</Button>
            <Button onClick={handleLogout} sx={{margin:"0px 13px 0px 13px" , padding: "12px 14px"}} startIcon={<LogoutIcon/>} color='inherit'>Logout</Button>
        </Stack>
    </Toolbar>
   </AppBar>
  )
}

export default Navbar