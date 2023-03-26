
import React from "react";

export const addItemToCart=(item,next)=>{
//make a cart array
let cart=[]
console.log(item);
if(typeof window!==undefined){
    if(localStorage.getItem("cart")){
        cart=JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({...item,count:1})
    localStorage.setItem("cart",JSON.stringify(cart))
}
next();
}

export const loadCart=()=>{
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }
    }
}

export const removeItemFromCart=(productId)=>{
    let cart=[]
    if(typeof window!==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"));
        }
        cart.map((prod,i)=>{
            if(prod._id===productId){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart;
    
}
