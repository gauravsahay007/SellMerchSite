import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { Link,Navigate } from 'react-router-dom'
import Base from '../core/Base'
import { createCategory } from './helper/adminapicalls'
import "../styles/CreateCategory.css"

const AddCat = () => {
    const [name, setName]= useState("")
    const [error, setError]= useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();

    const goBack= () => {
        <Link to="/admin/dashboard">
        <button className='btn'>Admin Home</button>
      </Link>
    }

    const handleChange = event => {
        setError("")
        setName(event.target.value)
    }

    const successMessage = () =>{
        if(success){
            return (
                <div className="success">Category Created Successfully!!</div>
            )
        }
    }

    useEffect(()=>{
        successMessage()
    },[success])
    const onSubmit = event => {
        event.preventDefault()
        setError("")
        setSuccess(false)

        // backend request fired
        createCategory(user._id,token,{name}).then(data => {
            if(data.error){
                setError(true)
            }
            else{
                setError("")
                setSuccess(true)
                setName("")
                setTimeout(()=>{
                    setSuccess(false)
                },1000)
            }
        })
    }

   

    const errorMessage = () => {
        if(error) {
            return (
                <div className="error">Failed to create category!!</div>
            )
        }
    }

    const myCategoryForm = () => (
        <form className='create-category-form'>
        <div className="form-group">
        <label className='label-form'>
           Enter the Category
        </label>
        <input type="text" onChange={handleChange} 
        className="form-input-category" value={name} autoFocus required placeholder='For eg Mens, Women'/>

        </div>
        <button className='submit-category' onClick={onSubmit}>Submit</button>
        {/* <button className='back' onClick={goBack}>Admin Home</button>  */}
    </form>
 
    )

    
    return (
        <Base title='Create a category here'>
            {successMessage()}
            {errorMessage()}
            {myCategoryForm()}
            {goBack()}
        </Base>
    )
}

const AddCategory = () => {
    return ((isAuthenticated() && isAuthenticated().user.role===1) ? AddCat() : <Navigate to="/"/>)
}

export default AddCategory