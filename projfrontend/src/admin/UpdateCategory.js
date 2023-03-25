import React,{useEffect,useState} from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Navigate, useParams } from "react-router-dom";

import { updateCategory,getCategory} from "./helper/adminapicalls";

const UpdateCategoryF = () => {

    const routerparams = useParams()

    const {user, token} = isAuthenticated()

    const [values , setValues] = useState({
        name: "",
        subcategory: [],
        error:"",
        loading:false
    })

    const {name, subcategory,error,loading} = values;
 
    const preload = categoryId => {
        
         getCategory(categoryId).then(data => {
           
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({
                    ...values, name:data.name
                })
            }
        })
    }

    useEffect(()=>{
        // console.log(values)
        preload(routerparams.categoryId)
    },[])

   const onSubmit = event => {
    event.preventDefault();
    
    setValues({...values, error:"",loading: true})
    console.log(token)
    updateCategory(token,routerparams.categoryId,user._id,{ name: values.name,
      subcategory: values.subcategory})
   }

   const handleChange = name => event => {
    if(name=="subcategory"){
        setValues({...values, subcategory: [...subcategory,event.target.value]})
    }
    else{
        setValues({...values, [name]: event.target.value})
    }
   
   }

 
    const updateValuesForm = () => {
        return   ( <div className="main">
        <form>
       
       <div className="form-group">
       <label className='label-form'>
           Name
       </label>
       <input type="text" onChange={handleChange("name")} className="form-input" value={name}/>

       </div> 

       <div className="form-group"> 
       <label className='label-form'>
           Subcategories
       </label>
       
       <input type="text"  onChange={handleChange("subcategory")}  className="form-input" />

       </div> 
       
       <button onClick={onSubmit}>Submit</button>
   </form>

   </div>)
    }

    return (<Base>
    {updateValuesForm()}
    </Base>)


}

const UpdateCategory = ({match}) => {
    return   ((isAuthenticated() && isAuthenticated().user.role===1) ? UpdateCategoryF() : <Navigate to="/"/>) 
}

export default UpdateCategory