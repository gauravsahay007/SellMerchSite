import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from "./Card"
import Imagehelper from './helper/Imagehelper'
import {getAllProducts} from "../admin/helper/adminapicalls"
import { addItemToCart,loadCart,removeItemFromCart } from './helper/CartHelper'
import "../styles/home.css"
export default function Home() {
  const [success,setSuccess] = useState(false)
  const [error,setError]=useState(false);
  const [products,setProducts]=useState([]);

  const loadAllProducts=()=>{
    getAllProducts().then(data=>{
      if(data.error){
        setError(data.error);
      }
      else{
        setProducts(data)
      }
    })
  }
  useEffect(()=>{ 
    loadAllProducts()
  },[])

  const successMessage=()=>{
    if(success){
      return (
          <div className="success">Added to cart!!</div>
      )
  }
  }
  const errorMessage=()=>{
    if(error) {
      return (
          <div className="error">Failed to add to cart!!</div>
      )
  }
  }

  useEffect(()=>{
    successMessage()
  },[success])

  useEffect(()=>{
    errorMessage() 
  },[error])

  
 

  return (
    <Base title='Home Page' description='Welcome to merch store'>
      {successMessage()}
      {errorMessage()}
       <div className="grid-collection-product">
       
                {products.map((prod,index)=>{
                    return (
                        <div key={index}  className="product">
                            
                          
                          <div className="image-container">
                          <Imagehelper prod={prod}/>
                          
                          </div>
                         <div className="container">
                         <div className="name">
                                <h1> {prod.name}</h1>
                        
                             </div>

                             <div className="cols-product">
                                 
 
                                 <button className='update-btn-home' onClick={()=>addItemToCart(prod,()=>{
                                  setSuccess(true)
                                  setInterval(()=>{
                                    setSuccess(false)
                                  },2000)
                                 })}  >Add To Cart</button>
                                  
                                </div>
          
                          </div>   
                             
                       
                         
                        </div>
                       
                    )
                })}
            </div>
       
    </Base>
  )
}
