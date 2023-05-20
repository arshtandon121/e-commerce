import Cards from "./Cards";
import React from "react";




const UserData = ({ users }) => {
  
window.arr={users}

localStorage.setItem('U', JSON.stringify(users));



  return (
    <>
   
      {users.map((user) => {
        return (
         
          
               <Cards key={user.id-1} curUser={user} />
               
          
          
        );
      })}
      
    </>
  );
};

export default UserData;
