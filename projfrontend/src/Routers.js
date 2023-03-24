import React from "react";
import { Routes,Route, BrowserRouter ,Link} from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategory";

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


        </Routes>
        </BrowserRouter>
    )
    
}