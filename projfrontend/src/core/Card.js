import React, { useState,useEffect } from "react";
import "../styles/card.css"
import Base from "./Base";
import ImageHelper from "./helper/ImageHelper"
import {addItemToCart} from "./helper/CartHelper"
import { Navigate } from "react-router-dom";
//cart need product, addtocart and remove from cart properties
const Card=({prod,
    addCart=true,
    removeCart=false,
    setReload=func=>func,
    reload=undefined})=>{
        const [redirect,setRedirect]=useState(false);
        const [count,setCount]=useState(prod.count);

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
        <div className="btnrow"><button className="cardbutton">Add</button></div>
     ))
   } 
   const showRemovefromCart=()=>{
      return(removeCart && (
        <div className="btnrow"><button className="cardbutton">Remove</button></div>
      ))
   }

   return(
    <Base title="MyCart" description="">
    <div className="card1">
       <div className="title">Title</div>
       <div className="bodytext">
        {getRedirect(redirect)}
        <ImageHelper product={prod}/>
        <h4 className="carddescription">Description</h4>
        <h3 className="price">Price:- 2000</h3>
        <div className="btnrow">
            
            {showAddToCart(addCart)}
            {showRemovefromCart(removeCart)}
        </div>
       </div>
    </div>
       
    </Base>
   )     
}
export default Card