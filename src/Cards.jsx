import React from 'react'
import { Link } from 'react-router-dom'



const Cards = ({curUser}) => {
 
  return (
    
      
  <Link to={`/home/${curUser.id}`}>
        <div className="box w-76  h-96 mb-6 flex items-center justify-center border-solid border-1 hover:transition duration-300 hover:scale-105 ">
          <div className=" w-76 h-96 center border-solid border-2 cursor-pointer hover:shadow-lg dark:hover:shadow-black/30  bg-white rounded-2xl shadow-[0px_0px_10px_#0000001a;]">
            <div className="img  h-48  w-72 overflow-hidden ">
              <img
                className="object-cover rounded-2xl  h-full w-full border-solid border-2 border-light-blue-400 hover:max-w-xs transition duration-400 ease-in-out hover:scale-125 hover:max-w-xs transition duration-300 ease-in-out hover:shadow-lg dark:hover:shadow-black/30 "
                src={curUser.thumbnail}
                alt=""
                srcSet=""
              ></img>
            </div>
            <div className="title grid  grid-flow-col  ">
              <h3 className="productName text-left text-orange-700 pb-3 ml-2 pt-2 text-x">
                {curUser.title}
              </h3>
              <h3 className=" text-right text-green-700 pb-3 mr-4 pt-2 text-x">
                
                <div class="card relative inline-block">
  <span class="original-price line-through text-red-700  ">{curUser.price} Rs/-</span>
  <span  class="discounted-price absolute top-3/4 left-23 right-0 w-20 ">{Math.floor(curUser.price-curUser.discountPercentage*curUser.price/100)} RS/-</span>
</div>
 
              </h3>
            </div>

            <div className="desc h-auto capitalize   w-72 text-justify pt-1 pl-2 pr-2   text-xs">
              <h2>Description : {curUser.description} </h2>
            </div>

            <div className="rating text-left flex  font-extralight  mt-3 ml-2">
              <h2 className="text-2x1  ">Rating : </h2>
              <h2 className="ml-3 ">{curUser.rating}</h2>
              <h2 className=" text-6x1">/5</h2>
            </div>

            <div className="discount flex  ml-2  font-extralight mt-2">
              <h2>Discount :</h2>
              <h2>{curUser.discountPercentage} %</h2>
            </div>
          </div>
        </div>
      
       </Link>
  )
}

export default Cards