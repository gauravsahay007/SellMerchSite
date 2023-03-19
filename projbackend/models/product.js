const mongoose=require("mongoose")
const {objectId}=mongoose.Schema;
const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            maxlength:32,
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
            type: objectId,
            required:true,
            maxlength:32,
            ref:"Category",
            trim:true
        },
        subCategory:{
            type: objectId,
            required:true,
            maxlength:32,
            ref:"Category",
            trim:true
        },
        stock:{
            type:Number,
            default:0
        },
        photo:{
            data:Buffer,
            contentType:String
        }
    },
    {timestamps:true}
);
module.exports=mongoose.model("Product",productSchema);