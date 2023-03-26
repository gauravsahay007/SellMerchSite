import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import "../styles/user.css"
import cart from "../cart.png"
import { Link, useNavigate } from 'react-router-dom';
export default function UserDashboard() {
  const {user:{name,email}}=isAuthenticated();
  const username=name;
  const navigate=useNavigate();
  const detail=()=>{
  return(
        

<div className='panel'>
         <div className="right-details">
           <h3 className='right-head'>User Details</h3>
          
           <ul className='right-list'>
            <li><span> <h1 className='admin-subdetail-key'> Name</h1> <h1 className='colon'>:</h1> <h1 className='admin-subdetail-value'>{name}</h1>  </span></li>
            <li><span><h1 className='admin-subdetail-key'> Email</h1> <h1 className='colon'>:</h1> <h1 className='admin-subdetail-value'>{email}</h1></span></li>
            
           </ul>
         </div>
         <div className='viewcart'>
            <div className='buttonicon'>
            <img className='photo' src={cart} alt=""  />
            <Link onSubmit={navigate("/cart")} ><button className='cartbutton'>View Your Cart</button>
</Link>
            </div>
         </div>
         </div>

     
     )
  }
  return (
    <Base title="Welcome  " description='' className="links">
{detail()}
    </Base>
  )
}
