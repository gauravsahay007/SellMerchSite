import React, { useState} from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom';

import { signup  } from '../auth/helper';
import "../styles/Signup.css"
export default function Signup() {

    // variables to be used in signup
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    // destructuring values
    const {name, email, password, success, error} = values;

    // method to assign the above variables a value through the form
    const handleChange = name => event => {
        // square bracket is used to dynamically update object property (when the name of the property is unknown upfront but runtime). This way you could have multiple React inputs having a different name property and using the same onChange handler to update part of the state.
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        // to avoid auto submit
        event.preventDefault()

        setValues({...values, error: false})

        signup({name,email,password}).then(data => {
            if(data.error){
                setValues({...values,error:data.error,
                success:false})
            }
            else{
                setValues({...values,
                        name:"",
                    password:"",
                error:"",
            success:true})
            }
        }).catch(err=>{if(err) console.log("Signup Failed")})
    }

    const successMessage = () => {
        return(
            <div className="alert" style={{display: success ? "":"none"}}>
                <h1>Signup Successfull</h1>
                <h3><Link to="/signin">Login here</Link></h3>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="error:alert" style={{display: error ? "":"none"}}>
            <h1>{error}</h1>
        </div>
        )
    }

    const signUpForm = () => (
        <div className="signup-form">
             <form className='sp-form'>
            <div className="form-group-sp">
            <label className='label-form'>
                Name
            </label>
            <input type="text" onChange={handleChange("name")} className="form-input"value={name} />
            </div>

            <div className="form-group">
            <label className='label-form'>
                Email
            </label>
            <input type="text" onChange={handleChange("email")} className="form-input" value={email}/>
            </div>

            <div className="form-group">
            <label className='label-form'>
                Password
            </label>
            <input type="text" onChange={handleChange("password")} className="form-input" value={password}/>
            </div> 
            <button onClick={onSubmit} className="sp-button">Submit</button>
        </form>

        </div>
       
    )
  return (
    <Base title="Sign up page" description="A page for user to signup">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
    </Base>
  )
}
