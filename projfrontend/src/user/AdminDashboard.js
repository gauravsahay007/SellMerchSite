import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import "../styles/ad.css"
const AdminDashboard=()=> {
  const {user:{name,email,role}}=isAuthenticated();
  const left=()=>{
     return(
      <div className='card'>
        <div className='left'>
        <h3>Navigation Panel</h3>
        <hr />
        <ul className='list'>
           <li>
            <Link className='link' to="/admin/create/category">Create category</Link>
           </li>
           <li><Link className='link' to="/admin/category">Manage Category</Link></li>
           <li><Link className='link' to="/admin/create/product">Create Product</Link>
            </li>
           <li><Link className='link' to="/admin/product">Manage Product</Link></li>
           <li><Link className='link' to="/admin/order">Manage Order</Link></li>
        </ul>
        </div>
         <div className='right'>
           <h3>Admin Details</h3>
           <hr />
           <ul>
            <li><span>Name: </span>{name}</li>
            <li><span>Email: </span>{email}</li>
            
           </ul>
         </div>
      </div>
     )
  }
  return (
    <Base title="Admin Dashboard" description=''>
      <div>
      <div>{left()}</div>
      {/* <div>{right()}</div> */}
      </div>
    </Base>
    
  )
}
export default AdminDashboard; 
