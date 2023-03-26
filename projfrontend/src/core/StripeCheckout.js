import React, { useState } from "react";
//we need isAuthenticated function to check if the user is authenticated
//empty cart that we have created 
//load cart to load cart from checkout 
import { isAuthenticated } from "../auth/helper";
import { emptyCart,loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
const StripeCheckout=({products,
    setReload=func=>func,
    reload=undefined})=>{
    const [data,setData]=useState({
        loading: false,
        success:false,
        error:"",
        address:""
    });
const token = isAuthenticated() && isAuthenticated().token
const userId= isAuthenticated() && isAuthenticated().user._id
const getPrice=()=>{
    let amount=0;
    products.map(prod=>{
        amount=amount+prod.price
    })
    return amount;
};
const showStripeButton=()=>{
    if(isAuthenticated()){
        return(
        <div>
          <button className="successbutton">Pay with Stripe</button>
        </div>
        )
    }
    else{
        <Link to="/signin">
            <button className="dangerbutton">SignIn</button>
        </Link>
    }
}
const errorMessage=()=>{

}
const successMessage=()=>{
    
}

    return(
        <div className="stripecard">
            <h3>Stripe Checkout Section {getPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}
export default StripeCheckout