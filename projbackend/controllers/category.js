//creating user controller logic
//import model of user from model folder
const Category=require("../models/category")
//middleware which fetch category data from the database through id
//it has access of request by object (req), response by object(res) and a callback funtion next( ) to call next function in the iterator
//it uses id as a parameter
exports.getCategoryById=(req,res,next,id)=>{
    //findById(id) is a method with parameter id and callback function to handle error or to do something with the document after it has been returned
    Category.findById(id).then((err,category)=>{
        //check if there is an error then return the json status 400
        //The 400 Bad request status code indicates that the server was unable to process the request due to invalid information sent by the client
        if(err){
            return res.status(400).json({
                error: "Category not found in database"
            })
        }
        //otherwise return the desired category
        req.profile=category;
        next();
    })
}
//createCategory function adds a new category if it doesn't exist
//It can access request of the object(req) and respond back to the object(res)
exports.createCategory=(req,res)=>{
//new :- create a new object 
//req.body:- It is a property that contains key-value pairs of data submitted 
//in the request body. It is defined by default and is populated when we use a middleware 
    const category=new Category(req.body);
    //save function saves the newly created document to the database
    //this call back function has error and new category as parameters
    category.save().then((cate,err)=>{
        //check if there is any error then return the error status
        if(err){
            return res.status(400).json({
                error:"Couldn't create category"
            })
        }
        //otherwise store the created category
        res.json({cate});
    })
}
//getCategory function returns the category this function is contained within
exports.getCategory=(req,res)=>{
    //return the json response of the category for which the object has requested
    return res.json(req.cate);
}
