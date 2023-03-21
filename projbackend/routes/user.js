var express =require("express");
var router=express.Router();
const {isAuthenticated,isAdmin, isSignedIn}=require("../controllers/auth");
const { getAllusers,getUser,getUserById, updateUser, getUserPurchaseList, pushOrderInPurchaseList } = require("../controllers/user");

// param fired up when detects :userId in the route
router.param("userId",getUserById);


// get user
router.get("/user/:userId",isSignedIn,isAuthenticated,isAdmin,getUser);

// get all users
router.get("/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllusers)

// update user
router.put("/user/:userId",isSignedIn,isAuthenticated,isAdmin,updateUser)

// userPurchase list
router.get("/orders/user/:userId", isSignedIn, isAuthenticated,getUserPurchaseList)

router.put("/orders/user/:userId/addtocart",isSignedIn, isAuthenticated,pushOrderInPurchaseList)



module.exports=router;