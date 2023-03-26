import React,{useEffect,useState} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import {  Navigate, useParams } from "react-router-dom";

import { updateCategory,getCategory} from "./helper/adminapicalls";

import "../styles/UpdateCategory.css"

const UpdateCategoryF = () => {

    const routerparams = useParams()
    
    const {user, token} = isAuthenticated()

    const [subcategoryText,SetSubcategoryText] = useState("")

    const [values , setValues] = useState({
        name: "",
        subcategory: [],
        error:"",
        loading:false
    })

    const [successCreated, setSuccessCreated] = useState(false)

    const [errCreated ,setErrCreated] = useState(false)

   

    const {name, subcategory,error,loading} = values;
    
   
    const successMessageCreated=()=>{
        if(successCreated){
          return (
              <div className="success"> Updated Category Successfully!!</div>
          )
      }
      }
    useEffect(()=>{
        successMessageCreated()
    },[successCreated])
 
    
     //   categoryId from params
     const preload = categoryId => {
        
        getCategory(categoryId).then(data => {
          
           if(data.error){
               setValues({...values,error:data.error})
           }
           else{
               setValues({
                   ...values, name:data.name,
                   subcategory: data.subcategory
               })
           }
       })
   }

    useEffect(()=>{
        // console.log(values)
        preload(routerparams.categoryId)
    },[])

    
      const errorMessage=()=>{
        if(errCreated) {
          return (
              <div className="error">Failed to update category!!</div>
          )
      }
      }

   const onSubmit = event => {
    event.preventDefault();
   
    setValues({...values, error:"",loading: true})
    console.log(token)
    updateCategory(token,routerparams.categoryId,user._id,{ name: values.name,
      subcategory: values.subcategory}).then(response => {
        setSuccessCreated(true)
        setTimeout(()=>{
            setSuccessCreated(false)
        },1000)
    }).catch(err => (setErrCreated(true)))
      
   
    
   }

   const handleChange = name => event => {
    if(name!=="subcategory"){
        setValues({...values, [name]: event.target.value})
    }
   }

   const AddSub = event => {
    event.preventDefault()
    setValues({...values, subcategory: [...subcategory,subcategoryText]})
    SetSubcategoryText("");
    
   }


    
    const updateValuesForm = () => {
        
        return   ( 
            <div>
                {successMessageCreated()}
                {errorMessage()}

<div className="container">
              
                 <div className="left">
           
            
           <form>
          
          <div className="form-group">
          <label className='label-form'>
              Name
          </label>
          <input type="text" onChange={handleChange("name")} className="form-input" value={name}/>
   
          </div>  
   
       
   
        
          <div className="form-group"> 
          <label className='label-form'>
              Add Subcategories
          </label>
          
          
          <input type="text"  onChange={(event)=>SetSubcategoryText(event.target.value)}  className="form-input" value={subcategoryText}/>
   
        
   
          </div> 
          <button onClick={AddSub} className="btn-add">Add</button>
          
          <button onClick={onSubmit}>Submit</button>
      </form>
   
      </div>
      
      <div className="right">
            <h1>{name} Subcategories</h1>
      <div className="sub">
            { subcategory.map((i,index) =>
                    ( 
                    
                    <div key={index} >{i} </div>
                     ))
            }  
            </div>
            </div>

        </div>
            </div>
           
       )
    }

    return (<Base title="Update Category" description="Update name and subcategory">
    {updateValuesForm()}
    </Base>)


}

const UpdateCategory = ({match}) => {
    return   ((isAuthenticated() && isAuthenticated().user.role===1) ? UpdateCategoryF() : <Navigate to="/"/>) 
}

export default UpdateCategory