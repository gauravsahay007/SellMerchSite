const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1= require('uuidv1');
mongoose.set('strictQuery', true); 
var Schema = mongoose.Schema;

var userSchema = new Schema({
   name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true
   },

   lastname: {
    type: String,
    maxlength: 32,
    trim: true
   },

   email:{
    type: String,
    trim: true,
    required: true,
    unique: true
   },

   userinfo: {
    type: String,
    trim: true
   },

   encry_password: {
    type: String,
    required: false
   },

   salt: String,
   role: {
    type: Number,
    default: 0
   },

   purchases : {
    type: Array,
    default: []
   }

  },{timestamps: true});

 
// Custom methods
 userSchema.methods= {

   
    securePassword: function(plainpassword){
        if(!plainpassword) return "";

        try{
          return crypto.createHmac('sha256', this.salt).update(plainpassword).digest('hex');  
        } catch(err){
            
        }
    },
    authenticate: function(plainpassword){
      return this.securePassword(plainpassword) === this.encry_password
  }

 }

 // creating virtual field to store password
  // UUID(Universally Unique Id) a 128-bits long identifier than can guarantee uniqueness across space and time
 userSchema.virtual("password")
 .set(function(password){
     this._password = password;
     this.salt = uuidv1();
     this.encry_password = this.securePassword (password);
 },{timestamps: true})
 .get(function(){
     return this._password;
 })
  
 // To use our schema definition we need to convert our userSchema into a model we can work with
// We use exports to define a module that can be required elsewhere
// creating and exporting model User
  module.exports = mongoose.model("User",userSchema)    
