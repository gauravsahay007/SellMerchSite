import React,{useState} from 'react'
import Base from '../core/Base'
import { Navigate } from 'react-router-dom'
import { isAuthenticated,signin,authenticate } from '../auth/helper'
import Home from '../core/Home'
import "../styles/Signin.css"
export default function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading:false,
        Redirect:false
    })

    const {email, password, error, loading,Redirect} = values;

    const {user} = isAuthenticated()

    const handleChange = name => event =>{
        setValues({...values, error:false,[name]: event.target.value})
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div style={{display: error? "" : "none"}}>
                <h1>ERROR</h1>
            </div>
        )
    }

    const onSubmit = event => {
        
        event.preventDefault()
        setValues({...values,error:false,loading:true})
        // signin returning the response which is the user data sent back by the backend
        // this data is stored in the local storage thruough authenticate method with object name "jwt"
        // this user data is taken back by isAuthenticated method by destructuring it
        signin({email,password}).then(data => {
            if(data.error){
                setValues({...values,error:data.error,
                loading:false})
            }
            else{
                
                authenticate(data, ()=>{
                    setValues({...values, Redirect:true})
                })
            }
        }).catch(err=>{if(err) console.log("Signin Failed")})
    }

    const performRedirect = (Redirect) => {
        if(Redirect){
            if(user && user.role === 1){
               
                return <Navigate replace to="/admin/dashboard"></Navigate>
            }
            else{
                return <Navigate replace to="/user/dashboard"></Navigate>
            }
        }
        
        if(isAuthenticated()){
            return <Home/>
        }
    }

    const signInForm = () => {
        return (
             <div className="signin-box">
        <form className='signin-form'>
       
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
       <button onClick={onSubmit} className="form-button">Submit</button>
   </form>

   </div>)
    }
  return (
    <Base title="Sign in page " description='A page for user signin '>
        {errorMessage()}
        {loadingMessage()}
        
        {signInForm()}
        {/* perform redirect comes after signin form bcz first by sign in user data is stored in the local storage then perform redirect uses the user.role from the userdata tp redirect further */}
        {performRedirect(Redirect)}


    </Base>
    
  )
}
