//creating user controller logic
//import model of user from model folder
const Category=require("../models/category")

const Subcategory = require("../models/subcategory")

//middleware which fetch category data from the database through id
//it has access of request by object (req), response by object(res) and a callback funtion next() to call next function in the iterator
//it uses id as a parameter
exports.getCategoryById=(req,res,next,id)=>{
    //findById(id) is a method with parameter id and callback function to handle error or to do something with the document after it has been returned
    Category.findById(id).then((category,err)=>{
        //check if there is an error then return the json status 400
        //The 400 Bad request status code indicates that the server was unable to process the request due to invalid information sent by the client
        if(err){
            return res.status(400).json({
                error: "Category not found in database"
            })
        }
        //otherwise return the desired category
        req.category=category;
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
   
    return res.json(req.category);
}


exports.removeCategory=(req,res)=>{
    const category = req.category;
    category.remove((err,category) => {
        if (err){
            res.status(400).json({
                error: "Failed to delete this Category"
            });
        }

        res.json({
            message: "Successfully deleted "
        })
     })
    
}

// update category method
exports.updateCategory=(req,res)=> {
    const category = req.category;
    category.name = req.body.name;

    category.save().then((updatedCategory,err)=>{
        if (err){
            res.status(400).json({
                error: "Failed to update Category"
            });
        }

        res.json(updatedCategory);
    })
}

// get all categories
exports.getAllcategory = (req,res) => {
    
    Category.find().then((categories,err)=>{
        if(err){
            return res.status(400).json({
                error: "No categories found"
            });
        }

        res.json(categories);
    })  
}

exports.getAllSubCategory = (req,res) => {
    const category  = req.category;
    res.json(category.subcategory)
}

exports.putSubcategory = (req,res) =>{ 
    const category = req.category;
    const subcategory =new Subcategory(req.body);
    category.subcategory.push({subcategory});
    //save function saves the newly created document to the database
    //this call back function has error and new category as parameters
    subcategory.save()

    category.save()  

    res.json({meassage:"Done adding the subcategories"})

}