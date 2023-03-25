import React from "react"
import { API } from "../../Backend"

const ImageHelper=({product})=>{
   const imageurl=product 
   ? `${API}/product/photo/${product._id}` 
   : `https://images.pexels.com/photos/7775635/pexels-photo-7775635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
    return(
        <div className="rounded border border-success p-2">
                <img
                src={imageurl}
                  alt="photo"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
        </div>
    )
}
export default ImageHelper