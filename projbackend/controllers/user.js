//creating user controller logic
//import model of user from model folder
const User=require("../models/user");
const {Order} = require("../models/order");
// getUserById() fetches the user object from the database based on the user's id
// It's a method which requires the parameter userId which provides the user information if it maps to the auth.user.id
// It is a middleware that have access to request object(req) repspond object(res) and call next function(next)
// id is the parameter passed ;all the documents are unique with an unique (_id) field path that MongoDB uses to automatically create a new document.
//It uses the method findById() to find a document with an unique Id
//syntax:- model.findById(id)
//model:-collection name to find document that match that specified Id
//id:- unique id of document we wish to find
//callback:- the method findById() can also execute a callback function to handle an error or do something with the document after it has been returned.
//check if there is any error or it's not the existing userId else return a json response
//The 400 Bad request status code indicates that the server was unable to process the request due to invalid information sent by the client.


exports.getUserById=(req,res,next,id)=>{
User.findById(id).then((user,err)=>{
if(err || !user){
    return res.status(400).json({
        error:"Oops...There is not any user of this id in the database"
    });
}
//if there isn't any error, it will return the user profile belonging to the user id
//In the route handler, you can then use req.profile. It's basically a way of propagating data from middleware
//profile is just a sort of convention used for a user/
//it's just like pasting the data of user from database 
//to profile so that we could further requests to read, update, delete etc
req.profile=user;
next();
//next() is middleware to return the next item from the iterator 
});  
};
//eliminating some encrypted data to be flashed on user screen
//getuser is a callback function to recieve request and return response
//
//A cryptographic salt is made up of random bits added to each password instance before its hashing
//Salting is a process that strengthens file encryption and hashes, making them more difficult to break
//undefined will eliminate password related fields before sending the user object
exports.getUser=(req,res)=>{
    req.profile.salt = undefined;
    req.profile.encry_password=undefined;
    return res.json(req.profile);
};

//updating user information
//This function is used for performing the update operation to our database by making use of the id of the particular document. This function mainly takes 2 compulsory arguments, the first one is the id and the second one is the actual update data.
//syntax:- findUserByIdAndUpdate(id,data_to_be_updated)
//accessing id
//The $set operator replaces the value of a field with the specified value.
exports.updateUser=(req,res)=>{
User.findByIdAndUpdate(
    {_id: req.profile._id},
    {$set: req.body},
    
    // FindAndModify() method depricated so need to set it as false
    { new: true, useFindAndModify: false },
    (err,user)=>{
        if(err){
            return res.status(400).json({
                error: "You are not authorized to update this user"
            })
        }
        
        user.salt=undefined;
        user.encry_password=undefined;
        res.json(user);
    }
);  
};

// get all users
exports.getAllusers=(req,res)=>{
    User.find().then((users,err)=>{
        if(err){
            res.status(400).json({
                error: "No users found"
            })
        }

        res.json({
            users
        })
    })
}

// get user purchase list method
exports.getUserPurchaseList=(req,res)=>{
    Order.find({user: req.profile._id}).then((order, err) => {
        if(err){
            return res.status(400).json({
                error: "No Order in this account"
            })
        }

        return res.json(order)
    })
}

exports.pushOrderInPurchaseList=(req,res)=>{
    let purchases=[];
    // from frontend passed list of products
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    User.findOneAndUpdate({_id: req.profile._id},
        {$push: {purchases: purchases}}),
        {new:true},
        (err, purchases) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }

            next();
        }
}