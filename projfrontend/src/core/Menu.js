import React, { Fragment } from "react";
import { Link,useNavigate} from "react-router-dom";
import {isAuthenticated,signout} from "../auth/helper/index";
import "../styles/Menu.css";
import logo from '../logo.png'

import Search from "./Search";


const Menu = () => {
    const navigate= useNavigate();
    
    return (
        
        <div className="container-menu"> <img src={logo} className="logo-img" alt=""/>  <div> <header>
        <div className="logo">
            <img src="./Icons/Logo.svg" alt=""/>
    
        </div>
        
        <nav>
            <ul className="nav-header">
                <li> {Search()}</li>
                <li className="li-items" ><Link to="/" className="nav-links">Home</Link> </li>
                
                <li className="li-items"><Link to="/cart" className="nav-links">Cart</Link></li>

                <li className="li-items"><Link to="/user/dashboard" className="nav-links">Account</Link></li>

                <li className="li-items"><Link to="/admin/dashboard" className="nav-links">Admin </Link></li>

                {!isAuthenticated() && (
                    <Fragment><li className="li-items"> <Link className="nav-links" to="/signup">Signup</Link> </li>

                    <li className="li-items"> <Link className="nav-links" to="/signin">SignIn</Link> </li></Fragment>
                    
                )}

                {isAuthenticated() && (
                    <Fragment><li className="nav-links"> <span onClick={()=>{
                       signout(()=>{
                        navigate("/")
                       })
                    }}>Signout</span> </li></Fragment>
                )}

            </ul>
        </nav>
    </header>
    </div></div>
       
    )
}

export default Menu