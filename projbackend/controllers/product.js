//Creating a controller for product
const Product=require("../models/product")
//importing formidable model for parsing form data,especially file uploads
const formidable=require("formidable");
const fs=require("fs");
const _=require("lodash");
//exporting the id of product to the database through a middleware
//getProductById which access request of object, response by user, and calls a next() callback function to call next function in the iterator
//It has a parameter id which is unique for each product
exports.getProductById=(req,res,next,id)=>{
    Product
//findById is a callback function or method which takes id as a parameter and find the products whose id matches with the provided one
    .findById(id)
//As each product will belong to category, so here we are populating category as a refrence
// populate() lets you refrence documents in other collections.
//population is the process of automatically replacing the specified paths
//in the documents with document from other collection
    .populate("category")
//executing a callback function with err and prod as parameter
    .exec((err,prod)=>{
        if(err){
//400:-The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error
            return res.status(400).json({
                error:"Product not found"
            });
        }
//if there is no error in data provided then save it in databse
        req.product=prod;
//call middleware function
        next();
    });
}
//createProduct() :- method which access request of object and respond to the user
//creating product 
//The req. body object allows you to access data in a string or JSON object from the client side
//req.body object is generally used to recieve data through POST and PUT in the Express server 
//.save() function will take error and created product as parameter and 
//check if there is no error then saves it to database, otherwise create an error response
//res.json() function sends a json response that is the parameter converted to a JSON string.
//While Creating a new product, if we have a look on product schema, creation of a product require a number of properties

exports.createProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
//parse function parses an incoming Node.js request containing from data
//.parse(req,callback)
//If a callback is provided, all fields and files are collected are passed to callback
//callback function have error,fields and file of photo
    form.parse(req,(err,fields,file)=>{
//if there is an error, then return error status
        if(err){
            return res.status(400).json({
                error: "There is an issue with attached image"
            })
        }

        
        //otherwise destructure the field parameter in the callback function of parse function 
        const {name,description,stock,price,category}=fields;
        //check if all the fields information are available 
        //if any of the fields is not provide then return error
        if(!name || !description || !stock || !price || !category){
            return res.status(400).json({
                error: "Please provide all the informations"
            });
        }
//create a new product using all the fields
        let product=new Product(fields);
//check if all the field are valid or not
//check if the file of the photo exists
//file.photo means user sent photo
        if(file.photo){
//check if the size of the photo is greater than 3000000, then return error
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
//files.photo.path will give you the exact path of the respective file (where that respective file is located or stored)
//files.photo.type will give you the content type of that particular file (the type of file it is - image, pdf, etc.)
//fs.readFileSync() method is an inbuilt application programming interface of fs module which is used to read the file and return its content.
//fs.readFileSync(path,options)
//
        product.photo.data= fs.readFileSync(file.photo.filepath);
        product.photo.contentType=file.photo.type;  
        }
//saving product to database
        product.save().then((prod,err)=>{
            if(err){
               return res.status(400).json({
                    error:"Product not saved to the database"
                });
            }
            res.json(prod);
        });
});
    
}
//getProduct() function returns a Promise that is resolved when all of the information about the product shown on the ProductPage is retrieved.
exports.getProduct=(req,res)=>{
    req.product.photo=undefined;
//res.json():-sends a response (with the correct content-type) that is the parameter converted to a JSON string using the JSON.stringify() method
    return res.json(req.product);
}
exports.getAllProducts=(req,res)=>{
//JavaScript parseInt() Method is used to accept the string and radix parameter and convert it into an integer
//The limit query parameter specifies the number of resources that a single response page contains.
//req.query property is an object containing the property for each query string parameter in the route
    let cnt=req.query.limit ? parseInt(req.query.limit):8
    let sort=req.query.sort ? req.query.sort: "_id"

    Product.find()
//select() is a method of Mongoose that is used to select document fields that are to be returned in the query result
    .select("-photo")
//populate() , which lets you reference documents in other collections. 
    .populate("category")
// sort() method specifies the order in which the query returns the matching documents from the given collection  
 //It takes a document as a parameter that contains a field
 //"asc":-command to sort in ascending
 //using limit()with sort() will sort the list till cnt provided
    .sort([[sort,"asc"]])
    .limit(cnt)
//executing
    .exec((err,prod)=>{
        if(err){
            return res.status(400).json({
                error:"No product found"
            })
        }
        return res.json(prod)
    })
}

exports.photo = (req, res, next) => {
    if (req.product.photo) {
        res.set("Content-Type", "image/png");
      return res.send(req.product.photo.data);
    }
    next();
  };
//deletion of an existing product
exports.deleteProduct=(req,res)=>{
    const prod=req.product;
//The remove() function is used to remove the documents from the database according to the condition
    prod.remove().then((product,err)=>{
        res.json({
            message:"Deleted successfully",
            product
        });
    }).catch(err=>console.log(err));
}//product updation
//functions same as create product
exports.updateProduct=(req,res)=>{
    let newform=new formidable.IncomingForm();
    newform.keepExtensions=true;
    newform.parse(req,(err,fields,file)=>{
      if(err){
        return res.status(400).json({
            error:"Issue with image to be updated"
        })
      }

      let newproduct=req.product;

    //   _.extend(object, sources)
    // object: This parameter holds the destination object.
    // sources: This parameter holds the source objects.
    // So here fields are copied to newproduct

//_.extend() function creates a copy of all the properties of the source objects over
//the destination object and return destination object  

//syntax:- _.extend(destination, *sources)
//

      newproduct=_.extend(newproduct,fields);

      if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"File is too big!"
            });
        }
        newproduct.photo.data=fs.readFileSync(file.photo.path);
        newproduct.photo.contentType=file.photo.type;
      }
    newproduct.save().then((prod,err)=>{
       
        res.json(newproduct);
    }).catch(err => console.log(err));
    
});
};

exports.getAllProducts=(req,res)=>{
    // whenever a query is fired up a ? is shown in the path a
    let cnt=req.query.limit ? parseInt(req.query.limit):8
    let sort=req.query.sort ? req.query.sort: "_id"
    Product
    .find()
    .select("-photo")
    .populate("category")
    .sort([[sort,"asc"]])
    .limit(cnt)
    .exec((err,prod)=>{
        if(err){
            return res.status(400).json({
                error: "No product found"
            })
        }
        res.json(prod)
    })
}

// exports.getAllProducts=(req,res)=>{
//     let cnt=req.query.limit ? parseInt(req.query.limit):8
//     let sort=req.query.sort ? req.query.sort: "_id"
//     Product
//     .find()
//     .select("-photo")
//     .populate("category")
//     .sort([[sort,"asc"]])
//     .limit(cnt)
//     .exec((err,prod)=>{
//         if(err){
//             return res.status(400).json({
//                 error: "No product found"
//             })
//         }
//         res.json(prod)
//     })
// }

exports.updateStock=(req,res,next)=>{
//map() applies a function to each array element and creates a new array of the returned values.
    let opern=req.body.order.products.map(ele=>{
        return{
//The updateOne() method returns a document that contains some fields. 
            updateOne:{
                filter:{_id:ele._id},
                update:{$inc: {stock:-ele.count,sold: +ele.count}}
            }
        }
    })

    //  With bulkWrite() method multiple documents can be inserted/updated/deleted in one shot

//model.bulkWrite():-
//method to perform multiple operations in one command 
//It can insert multiple documents,can update,replace,delete one or multiple documents
//syntax:- model.bulkwrite(operation,options,callback)

    Product.bulkWrite(opern,{},(err,ele)=>{
        if(err){
          return res.status(400).json({
            error: "Bulk operation failed"
          })  
        }
        next();
    })
}
exports.getAllUniquecategories=(req,res)=>{
//distinct() method finds the distinct values for a given field across a single collection and returns the results in an array

    Product.distinct("category",{},(err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"No catgeory found"
            })
        }
        res.json(cate)
    })
};