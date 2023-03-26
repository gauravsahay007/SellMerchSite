
//useState:- react hook that lets you add a state variable to your component
//syntax:- const [state,setstate]=usestate(initialstate)
//The convention is to name state variables like [something, setSomething] using array destructuring.
//React will call your initializer function when initializing the component, and store its return value as the initial state.
//The set function returned by useState lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state:
//nextstate=updater function
import { useState,useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllCategories,createProduct } from "./helper/adminapicalls";
import "../styles/CreateProduct.css"
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

  

    formData:"",

    
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
//useeffect is a react hook that lets you synchronize a component with an externa system
//useEffect(setup,dependencies?)
//setup code runs when our component is added to the page 
//
  useEffect(()=>{
preload();
  },[])
//handleChange function set a new state for the input

  const handleChange=name=>event=>{
//event.target.files is the entire array of files
    const value=name==="photo" ? event.target.files[0] : event.target.value;
//set() method of FormData inteface sets a new value for an existing key inside a Formdat Object or adds the key/value if it does not already exist
//FormData is an interface which provides a way to construct a set of key/value pairs representing form fields and their values
    formData.set(name,value);
    setValues({...values,[name]:value,success:true});
  };
  //On clicking Admin HOme button Link provides a path to go direct home
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

  useEffect(()=>{
    successMessage()
  },[success])

  useEffect(()=>{
    errorMessage() 
  },[error])

  const onSubmit=event=>{
//preventDefault() method cancels the event if it is cancelable,means default action that belongs to the event will not occur
    console.log("submitted");
   event.preventDefault();
   setValues({...values,error:"",loading:true});
   createProduct(user._id,token,formData)
   .then(data=>{
    console.log(data)
    if(data.error){
      setValues({...values,error:data.error});

      setTimeout(()=>{
        setValues({...values,error:""})
      },1000)
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
      }
      )

      setSuccess(true)
      setTimeout(()=>{
        setSuccess(false)
      },1000)
    }
   });



   
   
  };

  const productform=()=>{
   return(
    <form className="product-form">
   
    <div className="form-group">
      <label className="label-form">
        Choose Photo
      </label>
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          className="file-area"
          placeholder="choose a file"
        />
     
    </div>
    <div className="form-group">
    <label className="label-form">
        Name
      </label>
      <input
        onChange={handleChange("name")}
        name="photo"
        className="form-control"
       
        value={name}
      />
    </div>
    <div className="form-group">
    <label className="label-form">
        Description
      </label>
      <textarea
        onChange={handleChange("description")}
        name="photo"
        className="form-control"
       
        value={description}
      />
    </div>
    <label className="label-form">
        Price
      </label>
    <div className="form-group">
      <input
        onChange={handleChange("price")}
        type="number"
        className="form-control"
     
        value={price}
      />
    </div>
    <label className="label-form">
        Choose Category
      </label>
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
    <label className="label-form">
        Stock
      </label>
      <input
        onChange={handleChange("stock")}
        type="number"
        className="form-control"
        
        value={stock}
      />
    </div>
    <button className='submit' onClick={onSubmit}>Submit</button>

</form>
   )
  }
  return(
  
    <Base title="Add a product here!">
      <Link to="/admin/dashboard" className="links">Admin Home</Link>
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