//mongoose is an object data modelling library for mongoDb
//Defining Schema
const mongoose=require("mongoose")
//In mongoose, the ObjectId type is not used to create a new uuid, rather it is mostly used to refrence other documents
//mongoose.schema:- defines the dicument's properties,default values,type of variables,
//Mongoose model provides an interface for the database to create,query,update,delete...

const {ObjectId}=mongoose.Schema;
//Creating Schema to decide the properties of product,including default values,data types,if required
//Schema TYpes:-Array,String,bolean, etc..
const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:32,
            //trim removes white space 
            trim:true
        },
        description:{
            type:String,
            required:true,
            maxlength:2000,
            trim:true
        },
        price:{
           type:Number ,
           required:true
        },
        category:{
//here you set the category ID from the colection so you can reference it
            type: mongoose.Schema.Types.ObjectID,
            required:true,
            maxlength:32,
            ref:"Category",
            trim:true
        },
        subCategory:{
//here you set the category ID from the colection so you can reference it
            type: mongoose.Schema.Types.ObjectID,
            required:false,
            maxlength:32,
            ref:"Category",
            trim:true
        },
        stock:{
            type:Number,
            default:0
        },
        photo:{
//Our data type for the image is buffer which allows us to store our image as data in form of arrays            
            data:Buffer,
//he Content-Type header is used to indicate the media type of the resource. 
//The media type is a string sent along with the file indicating the format of the file
            contentType:String

        }
    },

    {timestamps:true}
);
module.exports=mongoose.model("Product",productSchema);