import { React, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Navbar from "./Components/navbar";
import { ToastContainer, toast } from "react-toastify";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Product = () => {
  const { id } = useParams();

  const numericId = parseInt(id);

  const [data, setData] = useState();



   

  // carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  // useEffect(()=>{

  // },[data])

  const customPrevButton = <button className="slider-button prev">Prev</button>;

  const customNextButton = <button className="slider-button next">Next</button>;

  //usestates for values of product

  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [quantity, setQuantity] = useState(1);
  const [userID, setUserID] = useState();



  // for user id 
  useEffect(() => {
    setUserID(localStorage.getItem('UserID'))
    
 }, [])


  // for getting price desc and thunail




  useEffect(() => {
    fetch(`http://localhost:8000/products`)
      .then((res) => {
        return res.json();
      })
      .then((userData) => {
        setPrice(userData[id - 1].price);
        setThumbnail(userData[id - 1].thumbnail);
        setTitle(userData[id - 1].title);
        setDescription(userData[id - 1].description);
        setData(userData);
        

        
      });
  }, []);

  const users = JSON.parse(localStorage.getItem('U'))
  
  

  var regobj = { id, thumbnail, price, title, description, quantity , userID};

  const itemAdded = () => {
    toast.success("Item Added to Cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const alreadyInCart = () => {
    toast.warn("Item Already in cart", {
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

  const [cartCheck, setCartCheck] = useState()
  const addToCart = () => {
    // for checking in cart is item already there ?

    fetch(`http://localhost:8000/cart`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setCartCheck(resp)
        var flag = 0;
        for (let i = 0; i < resp.length; i++) {
          if (id === resp[i].id && resp[i].userID===userID) {
            flag = 1;
            alreadyInCart();
            break;
          }
        }
         console.log(cartCheck)
        if (flag == 0) {
          fetch("http://localhost:8000/cart", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(regobj),
          })
            .then((res) => {
              itemAdded();
            })
            .catch((err) => {});
        }
      });
  };

  return (
    <>
      <Navbar />
      <div className="  text-black-900 body-font font-bold  font-poppins container  text-black">
        {}
        <div className="mid ml-16 mr-16 mt-16 h-100% w-92% grid grid-flow-col gap-16  grid-cols-2    bg-white shadow-   [0px_0px_10px_#0000001a ">
          <div className="left w-100% h-92       shadow-lg shadow-black/30">
            <div style={{ width: "100%" }}>
              <Slider {...settings}>
                <div className="flex justify-center text-center items-center">
                  <img
                    className="object-contain w-full h-96 flex"
                    src={users[id - 1].images[0]}
                    alt=""
                  />
                </div>

                <div className="flex justify-center text-center items-center">
                  <img
                    className="object-contain h-96 w-full flex "
                    src={users[id - 1].images[1]}
                    alt=""
                  />
                </div>

                <div className="flex justify-center text-center items-center">
                  <img
                    className="object-contain w-full h-96 flex"
                    src={users[id - 1].images[2]}
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </div>

          <div className="right h-fit    shadow-lg shadow-black/30   ">
            <div className="Pname h-12 text-2xl w-full ml-8 flex items-center text-gray-700">
              {users[id - 1].title}{" "}
            </div>
            <div className="Pdesc ml-8 mt-2 mb-2 text-gray-700 text-sm">
              {users[id - 1].description}
            </div>
            <div className="Pcategory ml-8 mt-2 mb-2 font-extralight">
              Category :{users[id - 1].category}
            </div>
            <div className="Prating ml-8  mt-2 mb-2">
              {" "}
              Rating : {users[id - 1].rating}{" "}
            </div>
            <div className="Pprice ml-8  mt-2  font-semibold text-2xl ">
              {users[id - 1].price}/RS
            </div>
            <div className="text ml-8   mb-2 text-xs text-green-700 ">
              inclusive of all taxes
            </div>
            <div className="Pstock ml-8  mt-2 mb-2 ">
              Stock : {users[id - 1].stock}
            </div>
            <div>
              <button className="bg-green-500 mr-4 mb-6 ml-8 mt-8 w-40 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
                Buy
              </button>
              <button
                onClick={addToCart}
                className="bg-blue-500 mr-8 mb-6  mt-8 w-40 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
