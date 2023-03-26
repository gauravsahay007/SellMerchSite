import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Navigate } from "react-router-dom";
import { Link,useParams } from "react-router-dom";
import { getAllCategories, getProduct, updateProduct } from "./helper/adminapicalls";

const UpdateProduct=({match})=>{
  const id= useParams()
    const {user,token}=isAuthenticated();
     const [success,setSuccess]=useState(false);
  
    const [values,setValues]=useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:"",
        category:[],
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:new FormData(),
        success:""
    });
    const {name,description,price,stock,categories,category,loading,error,createdProduct,getaRedirect,formData}=values;
    const preload=productId=>{
       getProduct(productId)
       .then(data=>{
        if(data.error){
          setValues({...values,error:data.error});
        }
        else{
            preloadCategories();
            setValues({
                ...values,
                name:data.name,
                description:data.description,
                price:data.price,
                stock:data.stock,
                category:data.category._id,
                formData:new FormData(),
                // success:true
            })
        };
       });
    };
    const preloadCategories=()=>{
      getAllCategories()
      .then(data=>{
        if(data.error){
            setValues({...values,error:data.error});
        }
        else{
            setValues({
              ...values,
                categories:data,
                formData:new FormData()
            });
        };
      });
    };
    useEffect(()=>{
      (preload(id.productId));
      (preloadCategories(id.categories))
    },[]);
    const onSubmit=event=>{
        console.log("submitted");
      event.preventDefault();
      // console.log(data);
      setValues({...values,error:"",loading:true});
      updateProduct(id.productId,user._id,token,formData)
      .then(data=>{
        console.log(data)
        if(data.error){
            setValues({...values,error:data.error});
        }
        else{
          setValues({
                ...values,
                name:"",
                description:"",
                stock:"",
                price:"",
                loading:false,
                createdProduct:data.name
                
              })
              setSuccess(true)
        }
        
      })  
    }
    const handleChange=name=>event=>{
        //event.target.files is the entire array of files
            const value=name==="photo" ? event.target.files[0] : event.target.value;
        //set() method of FormData inteface sets a new value for an existing key inside a Formdat Object or adds the key/value if it does not already exist
        //FormData is an interface which provides a way to construct a set of key/value pairs representing form fields and their values
            formData.set(name,value);
            setValues({...values,[name]:value,success:true});
          };
    const successMessage=()=>{
      if(success){
        return(
            <div className="success">Product Updated Successfully</div>
        )
      }
    }
    const errorMessage=()=>{
if(error){
    return(
       <div className="error">"Failed to update</div>
    )
}
    }
    useEffect(()=>{
      successMessage()
    },[success])
    useEffect(()=>{
      errorMessage()
    },[error])
    const createProductForm=()=>{
       
        
            return(
              <div>
                {/* {successMessage()}
                {errorMessage()} */}
             <form>
            
             <span>Post photo</span>
             <div className="form-group">
               <label className="label-form">
                 <input
                   onChange={handleChange("photo")}
                   type="file"
                   name="photo"
                   accept="image"
                   placeholder="choose a file"
                 />
               </label>
             </div>
             <div className="form-group">
               <input
                 onChange={handleChange("name")}
                 name="photo"
                 className="form-control"
                 placeholder="Name"
                 value={name}
               />
             </div>
             <div className="form-group">
               <textarea
                 onChange={handleChange("description")}
                 name="photo"
                 className="form-control"
                 placeholder="Description"
                 value={description}
               />
             </div>
             <div className="form-group">
               <input
                 onChange={handleChange("price")}
                 type="number"
                 className="form-control"
                 placeholder="Price"
                 value={price}
               />
             </div>
             <div className="form-group">
               <select
                 onChange={handleChange("category")}
                 className="form-control"
                 placeholder="Category"
               >
                 <option>Select</option>
                 {categories &&
                   categories.map((cate, index) => (
                     <option key={index} value={cate._id}>
                       {cate.name}
                     </option>
                   ))}
               </select>
             </div>
             <div className="form-group">
               <input
                 onChange={handleChange("stock")}
                 type="number"
                 className="form-control"
                 placeholder="Stock"
                 value={stock}
               />
             </div>
             <button className='submit' onClick={onSubmit}>Submit</button>
         
         </form>
         </div>
            )}
    
   return(
    <Base title="Update a product here!">
      <Link to="/admin/dashboard" className="links">Admin Home</Link>
      {successMessage()}
      {errorMessage()}
      {createProductForm()}
      {/* {goBack()} */}
     
     
    </Base>
   )
}
// const UpdateProduct = () => {
//   return ((isAuthenticated() && isAuthenticated().user.role===1) ? UpdateProd() : <Navigate to="/"/>)
// }
export default UpdateProduct