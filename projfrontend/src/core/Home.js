import React, { useEffect, useState } from 'react'
import Base from './Base'
import Card from "./Card"
import {getAllProducts} from "../admin/helper/adminapicalls"
export default function Home() {
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
  return (
    <Base title='Home Page' description='Welcome to merch store'>
        <div>
           <h1>All Merch here</h1>
           <div className="row">
            {products.map((product,i)=>{
              return(
                <div key={i} className="key">
               <Card product={product}/>
                </div>
              )
            })}
           </div>
      </div>
    </Base>
  )
}
