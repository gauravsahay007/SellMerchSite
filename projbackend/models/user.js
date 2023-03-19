const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1= require("uuid/v1")

var Schema = mongoose.Schema

// creating user schema
var userSchema = new Schema({
    name: {
        type: string,
        required: true,
        maxlength: 32,
        // trim removes the white spaces
        trim: true
    },

    lastname: {
        type:string,
        required:true,
        maxlength: 32,
        trim:true
    },

    encrypted_paswword: {
        type:string,
        required: false
    },

    email: {
        type: string,
        required: true,
        maxlength: 40,
        trim: true
    },

    info: {
        type:string,
        trim: true
    },

    salt: {
        type:Number,
        default: 0
    },

    purchases: {
        type: Array,
        default: []

    }
},{timestamps: true})


// To use our schema definition we need to convert our userSchema into a model we can work with
// We use exports to define a module that can be required elsewhere
// creating and exporting model User
model.exports = mongoose.model("User",userSchema);

// creating a method to encrpt password
const securePassword = (plainpassword) => {
    if(!plainpassword) return "";

    // HMAC(Hash Based Authentication Code) process to apply a hash algorithm to both data
    // in this case data is password and secret key which is salt
    // Hash procedurally and deterministically generated from some arbitrary block of source data
    return crypto.createHmac('sha256',this.salt).update(plainpassword).digest('hex');
}

// creating virtual field to store password
userSchema.virtual("password")
.set((password)=>{
    this._password= password;

    // UUID(Universally Unique Id) a 128-bits long identifier than can guarantee uniqueness across space and time
    this.salt= uuidv1();
    this.encrypted_paswword = this.securePassword(password);
}).get(()=>{
    return (this._password);
})