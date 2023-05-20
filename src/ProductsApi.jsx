import React, { useState, useEffect } from "react";
import UserData from "./UserData";

let api = "http://localhost:8000/products";
function ProductsApi() {
  const [users, setUsers] = useState([]);

  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.length > 0)
     
       {
        setUsers(data);

        fetch(`http://localhost:8000/products/`)
          .then((res) => {
            return res.json();
          })
          .then((products) => {
            // for db.json to store data
            if (products == "") {
              // Compare credentials

              fetch("http://localhost:8000/products", {
                method: "POST",
                headers: { "content-type": "application/json" },

                body: JSON.stringify(data),
              });
            }
          });

      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApiData(api);
  }, []);

  return (
    <>
      <UserData users={users} />
    </>
  );
}

export default ProductsApi;
