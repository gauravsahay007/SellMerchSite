const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const { getCategoryById,createCategory,getCategory, removeCategory, updateCategory, getAllcategory, getAllSubCategory, putSubcategory } = require("../controllers/category");
const {getUserById}=require("../controllers/user");

// fires up when :userId detected in the route
router.param("userId",getUserById);

// fires up when :categoryId detected in the route
router.param("categoryId",getCategoryById);

// create 
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory);

// read
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllcategory)

// remove
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)

// update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

// add subcategories
router.post("/category/:categoryId/:userId/Addsubcategories",isSignedIn,isAuthenticated,isAdmin,putSubcategory)
module.exports=router;

// get subcategories
router.get("/category/:categoryId/subcategories",isSignedIn,isAuthenticated,getAllSubCategory)

