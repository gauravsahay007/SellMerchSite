const express=require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getCategoryById } = require("../controllers/category");
const { createOrder } = require("../controllers/order");
const { getProductById } = require("../controllers/product");
const { getUserById } = require("../controllers/user");
const router=express.Router();
router.param("userId",getUserById)
router.param("productId",getProductById);
router.param("categoryId",getCategoryById)
router.post("/order/create/:userId",isSignedIn,isAuthenticated,isAdmin, createOrder)
module.exports=router;