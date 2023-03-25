import React, { useEffect, useState } from "react";
import Card from "./Card"
import Base from "./Base";
import { loadCart } from "./helper/CartHelper";

const Cart=()=>{
const [products ,setProducts]=useState([])
const [reload,setReload]=useState(false)
useEffect=(()=>{
setProducts(loadCart());
},[reload])

const loadAllProducts=()=>{
return(
    <div>
        {products.map((prod,i)=>{

        <Card
        key={i}
        product={prod}
        removeCart={true}
        addCart={false}
        setReload={setReload}
        reload={reload}
        
        />
        })}

    </div>
)
}
const loadCheckOut=()=>{
return(
    <div>
        This is checkout section
    </div>
)
}


    return(
        <Base title="My Cart" description="Ready to checkout">
        <div className="rowcard">
          <div className="col">{loadAllProducts()}</div>
          <div className="col">{loadCheckOut()}</div>
          
        </div>
      </Base> 
    )
}
export default Cart;