import React, { useState,useEffect } from "react";
import "../styles/card.css"
import Base from "./Base";
import Imagehelper from "./helper/Imagehelper"
import {addItemToCart,removeItemFromCart} from "./helper/CartHelper"
import { Navigate } from "react-router-dom";
//cart need product, addtocart and remove from cart properties
const Card=({prod,
    addCart=true,
    removeCart=false,
    setReload=func=>func,
    reload=undefined})=>{
        const [redirect,setRedirect]=useState(false);
        // const [count,setCount]=useState(prod.count);
        const cartTitle = prod ? prod.name : "A photo from pexels";
        const cartDescrption = prod ? prod.description : "Default description";
        const cartPrice = prod ? prod.price : "DEFAULT";
    const AddToCart=()=>{
    addItemToCart(prod,()=>setRedirect(true)
    )}
   const getRedirect=(redirect)=>{
    if(redirect){
        return <Navigate to="/cart"/>
    }
   }
   const showAddToCart=()=>{
     return (addCart && (
        <div className="btnrow"><button onClick={()=>{
          addItemToCart(prod._id)
        }} className="cardbutton">Add</button></div>
     ))
   } 
   const showRemovefromCart=()=>{
      return(removeCart && (
        <div className="btnrow"><button onClick={() => {
          removeItemFromCart(prod._id);
          setReload(!reload);
        }} className="cardbutton">Remove</button></div>
      ))
   }

   return(
   
    <div className="card1">
       <div className="title">{cartTitle}</div>
       <div className="bodytext">
        {getRedirect(redirect)}
        <Imagehelper product={prod}/>
        <h4 className="carddescription">{cartDescrption}</h4>
        <h3 className="price">Price:-$ {cartPrice}</h3>
        <div className="btnrow">
            
            <div>{showAddToCart(addCart)}</div>
            <div>{showRemovefromCart(removeCart)}</div>
        </div>
       </div>
    </div>
    
   
       
  
   )     
}
export default Card