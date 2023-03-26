import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import "../styles/Admin.css"


const AdminDashboard=()=> {
  const {user:{name,email}}=isAuthenticated();
  const left=()=>{
     return(
      <div className='admin-panel'>
        <div className='left-options'>
        <h3 className='left-head'>Navigation Panel</h3>
  
  
        <ul className='left-list'>
           <li>
            <Link className='link' to="/admin/create/category">Create category</Link>
           </li>
           <li><Link className='link' to="/admin/category">Manage Category</Link></li>
           <li><Link className='link' to="/admin/product/create">Create Product</Link>
            </li>
           <li><Link className='link' to="/admin/product">Manage Product</Link></li>
           <li><Link className='link' to="/admin/order">Manage Order</Link></li>
        </ul>
        </div>


         <div className='right-details'>
           <h3 className='right-head'>Admin Details</h3>
          
           <ul className='right-list'>
            <li><span> <h1 className='admin-subdetail-key'> Name</h1> <h1 className='colon'>:</h1> <h1 className='admin-subdetail-value'>{name}</h1>  </span></li>
            <li><span><h1 className='admin-subdetail-key'> Email</h1> <h1 className='colon'>:</h1> <h1 className='admin-subdetail-value'>{email}</h1></span></li>
            
           </ul>
         </div>

      </div>
     )
  }
  return (
    <Base title="Admin Dashboard" description=''>
      <div>
      <div>{left()}</div>
     
      </div>
    </Base>
    
  )
}
export default AdminDashboard; 
