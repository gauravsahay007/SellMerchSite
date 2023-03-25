import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { Navigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "./helper/adminapicalls";
import "../styles/ManageProduct.css"
import Imagehelper from "../core/helper/Imagehelper";
const ManageAllProduct=()=>{
 const [products,setProducts]=useState([]);
 const {user,token}=isAuthenticated();
 const preload=()=>{
    getAllProducts()
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            setProducts(data);
        }
    })
 }
 useEffect(()=>{ 
    preload();
 },[products]);
 
 
 const deleteThisProduct=productId=>{
    deleteProduct(productId,user._id,token)
    .then(data=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            preload();
        }
    });
 };
 
 return (
    <Base title='Products' description='List of products'>
            <div className="grid-collection-product">
                {products.map((prod,index)=>{
                    return (
                        <div key={index}  className="product">
                             <div className="row">
                          
                          <div className="image-container">
                          <Imagehelper prod={prod}/>
                          <div className="name">
                                <h1> {prod.name}</h1>
                        
                             </div>
                          </div>
                         <div className="container">
 
                         <div className="cols-product">
                                 <Link to={`/admin/product/update/${prod._id}`}></Link>
 
                                 <button className='update-btn'>Update</button>
                            
                                <Link to={`/admin/product/update/${prod._id}`}></Link>
 
                                 <button className='delete-btn' onClick={()=>deleteThisProduct(prod._id,user._id,token)}>Delete</button>
                             </div>
                         
 
                          </div>   
                             
                         </div>
                         
                        </div>
                       
                    )
                })}
            </div>
        </Base>
 )
};

const ManageProduct = () => {
    return ((isAuthenticated() && isAuthenticated().user.role===1) ? ManageAllProduct() : <Navigate to="/"/>)
}
export default ManageProduct;