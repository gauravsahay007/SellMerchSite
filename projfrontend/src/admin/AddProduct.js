import React from "react";
import { useState,useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllCategories,createProduct } from "./helper/adminapicalls";

const AddProd=()=>{
  //To add a product an user must be authenticated
  const {user,token}=isAuthenticated();
  const [success,setSuccess]=useState(false);
  // const [error,setError]=useState(false);
  const [values,setValues]=useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    category:"",
    categories:[],
    loading:false,
    error:"",
    createdProduct:"",
    getaRedirect:false,
    formData:""
  });
  //destructuring the values 
  const {name,description,price,stock,category,categories,loading,error,createdProduct,getaRedirect,formData}=values;
  const preload=()=>{
    getAllCategories()
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error})
      }
      else{
        setValues({...values,categories:data,formData:new FormData()});
      }
    })
    
  }
  useEffect(()=>{
preload();
  },[])
  const handleChange=name=>event=>{
    const value=name==="photo" ? event.target.files[0] : event.target.value;
    formData.set(name,value);
    setValues({...values,[name]:value});
  };
  const goBack=()=>{
    <Link to="/admin/dashboard">
        <button className='btn'>Admin Home</button>
      </Link>
  }
  const successMessage=()=>{
    if(success){
      return (
          <div className="success">Product Created Successfully!!</div>
      )
  }
  }
  const errorMessage=()=>{
    if(error) {
      return (
          <div className="error">Failed to create product!!</div>
      )
  }
  }

  const onSubmit=event=>{
   event.preventDefault();
   setValues({...values,error:"",loading:true});
   createProduct(user._id,token,formData)
   .then(data=>{
    if(data.error){
      setValues({...values,error:data.error});
    }
    else{
      setValues({
        ...values,
        name:"",
        description:"",
        price:"",
        photo:"",
        stock:"",
        loading:false,
        createdProduct:data.name
      });
    }
   });
  };
  const productform=()=>{
   return(
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
   )
  }
  return(
  
    <Base title="Add a product here!">
      <Link to="/admin/dashboard" className="link">Admin Home</Link>
      {successMessage()}
      {errorMessage()}
      {productform()}
      {goBack()}
    </Base>
    
  )

}
const AddProduct = () => {
  return ((isAuthenticated() && isAuthenticated().user.role===1) ? AddProd() : <Navigate to="/"/>)
}
export default AddProduct