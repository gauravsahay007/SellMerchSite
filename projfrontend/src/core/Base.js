import React from 'react'
import Menu from './Menu'
import img from '../home-page.png'
import "../styles/Base.css"
import { useNavigate,Navigate } from 'react-router-dom'
export default function Base({title="My title",description="My description",children}) {
  const navigate= useNavigate();
  const gohome=()=>{
    return(
   
      <Navigate to="/"/>
   
    )
  }
  return (
    <div>
        <Menu/>
        <div className='admin-head'> <h2>{title}</h2>
        <p>{description}</p>
       <img src={img} alt="" className='homeicon'  onClick={()=>{
                      
                        navigate("/")
                     
                    }} />
        </div>
        <div>

            <div className="content">
                {children}
            </div>

        </div>
    </div>
  )
}
