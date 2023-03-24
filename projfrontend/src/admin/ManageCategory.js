import React,{useEffect,useState} from 'react'

import Base from '../core/Base'
import { Link,Navigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { deleteCategory, getAllCategories } from './helper/adminapicalls'

const ManageAllCategories = () => {
    const [categories, setCategories] = useState([])

    const {user, token} = isAuthenticated();

    const autoload = () => {
        getAllCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        autoload()
    },[])
    console.log(categories)
    console.log(user)
    return (
        <Base title='Categories' description='List of categories'>
            <div className="grid-collection">
                {categories.map((category,index)=>{
                    return (
                        <div key={index}>
                           
                            <div className="cols">
                               <h1> {category.name}</h1>
                            </div>

                            <div className="cols">
                                <Link to={`/admin/product/update/${category._id}`}></Link>

                                <button className='update-btn'>Update</button>
                            </div>

                            <div className="cols">
                               <Link to={`/admin/product/update/${category._id}`}></Link>

                                <button className='delete-btn' onClick={()=>deleteCategory(user._id,token,category._id,category.name)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Base>
    )
}

const ManageCategories = () => {
    return ((isAuthenticated() && isAuthenticated().user.role===1) ? ManageAllCategories() : <Navigate to="/"/>)
}

export default ManageCategories