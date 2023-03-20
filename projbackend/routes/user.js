var express =require("express");
var router=express.Router();
const {isAuthenticated,isAdmin, isSignedIn}=require("../controllers/auth");
router.get("/user/:userId",isSignedIn,isAuthenticated,isAdmin);

module.exports=router;