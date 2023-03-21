
const express=require("express");
const router=express.Router();
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth");
const { getProductById,
       createProduct, 
       getProduct,
       deleteProduct,
       updateProduct
} = require("../controllers/product");


const { getUserById } = require("../controllers/user");
router.param("userId",getUserById);
router.param("productId",getProductById);
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin, createProduct);
//read routes
router.get("/product/get/:productId",getProduct);
router.put("/product/update/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
//delete routes
router.delete(
       "/product/:productId/:userId",
       isSignedIn,
       isAuthenticated,
       isAdmin,
       deleteProduct
     );
module.exports=router;
