
//importing userSchema model for authorization
const User=require("../models/user")
const {check,validationResult}=require("express-validator");

// Importing user model
const User = require("../models/user");

// express-validator contains chain of custom middlewares for validation of a thing if it is validated validationResult extracts the valiation errors of an express request
// check-> creates a valiation chain for one or more fields
// validationResult: extracts the validation errors of an express request
const {check, validationResult} = require("express-validator");


// UserSignUp method and logic

exports.signup = (req,res) =>{

    // extracting errors if any
    const errors = validationResult(req);

    // .isEmpty() return true if a string is empty
    if(!errors.isEmpty()){
        // The HyperText Transfer Protocol (HTTP) 422 Unprocessable Content response status code indicates that the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    // else

    //user copies User body data 
   const user = new User(req.body);

  // .save is a way to save changes we made to a document to a DATABASE it return a call back with a error object and the user object itself
   user.save((err,user) => {

    // if there is error or no user
    if(err || !user){
        // 400 bad request error
        return res.status(400).json({
            err: "Not able to save user in DATABASE"
        })
    }

    // otherwise give a json response
    res.json({
        name: user.name,
        email: user.email,
        id: user._id
    })
   })
}

    // SignIn
    exports.signin = (req,res) => {
        const errors = validationResult(req);

        // destructuring email and password from the request body made by user
        const {email, password} = req.body;

        if(!errors.isEmpty()){
            res.status(422).json({
                // get validation error string as an array
                error: errors.array()[0]
            })
        }


        // else
        // MongoDB findOne() method returns only one document that satisfies the criteria entered. If the criteria entered matches for more than one document, the method returns only one document according to natural ordering, which reflects the order in which the documents are stored in the database.

        // MongoDB findOne() syntax is: db.collection.findOne(<criteria>, <projection>) 
        
        // criteria - specifies the selection criteria entered.

        //  projection - specifies the list of fields to be displayed in the returned document. 

        User.findOne({email}, (err,user) => {
            if(err){
                res.status(400).json({
                    error: "User email doesnot exists"
                })
            }

            // .authenticate is a custom method created at user.js models
            // Authentication: Process of verifying a user's identification through the acquisition of credentials and using DATABASE credentials to confirm user identity
            if(!user.authenticate(password)){
                return res.status(401).json({
                    error : "Email and password donot match"
                })
            }

            // JSON WEB TOKENS are RFC 7519 open industry standard for representing claims between two parties
            // JWT specifies a compact and self contained method for communicating information as a JSON object between two parties
            // It can be signed using SECRET

            // Create a JWT TOKEN
            // here {_id: user._id} is Payload which can be string/object/Buffer  and process.env.SECRET is the secret key to encrypt
            const token = jwt.sign({_id: user._id},process.env.SECRET)

            // put token in cookie
            
            res.cookie("token",token,{expire: new Date()+9999})

            // send response to front end
            const { _id,name,email ,role} = user;
            return res.json({
                token,
                user:{_id,name,email,role}
            })
        })
    }

