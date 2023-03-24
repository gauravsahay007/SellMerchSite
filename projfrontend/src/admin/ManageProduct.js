import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { Navigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "./helper/adminapicalls";
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
 },[]);
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
            <div className="grid-collection">
                {products.map((prod,index)=>{
                    return (
                        <div key={index} className="row">

                        <div className="container">
                        <div className="name">
                               <h1> {prod.name}</h1>
                            </div>

                            <div className="cols">
                                <Link to={`/admin/product/update/${prod._id}`}></Link>

                                <button className='update-btn'>Update</button>
                           
                               <Link to={`/admin/product/update/${prod._id}`}></Link>

                                <button className='delete-btn' onClick={()=>deleteProduct(user._id,token,prod._id,prod.name)}>Delete</button>
                            </div></div>   
                            
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