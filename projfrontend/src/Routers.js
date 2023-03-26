import React from "react";
import { Routes,Route, BrowserRouter,useParams } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategory";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProduct";
import Order from "./admin/order";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import Card from "./core/Card"; 
import FindByCategory from "./core/FindByCategory";
import Search from "./core/Search";

export default function Routers() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Home/>}/>

            <Route path="/signup" exact element={<Signup/>}/>

            <Route path="/signin" exact element={<Signin/>}></Route>

            <Route path="/admin/dashboard" exact element={<AdminRoute/>}></Route>

            <Route path="/user/dashboard" exact element={<PrivateRoute/>}></Route>

            <Route path="/admin/create/category" exact element={<AddCategory/>}></Route>

            <Route path="/admin/category" exact element={<ManageCategories/>}></Route>
            <Route path="/admin/product/create" exact element={<AddProduct/>}></Route>
            <Route path="/admin/product" exact element={<ManageProduct/>}></Route>
            <Route path="/admin/order" exact element={<Order/>}></Route>

            <Route path="/admin/category/:categoryId" exact element={<UpdateCategory/>}></Route>

            <Route path="/admin/product/update/:productId/:userId" exact element={<UpdateProduct/>}></Route>
            {/* <Route path="/cart" exact element={<Card/>}></Route> */}

            
        
            <Route path="/cart" exact element={<Cart/>}></Route>

            <Route path="/findByCategory/:categoryId" exact element={<FindByCategory/>}></Route>

            <Route path="/search" exact element={<Search/>}></Route>

            
 

        </Routes>
        </BrowserRouter>
    )
    
}