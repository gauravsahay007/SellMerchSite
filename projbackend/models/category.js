const mongoose=require("mongoose");

// creating categorySchema

const {ObjectId} = mongoose.Schema;

const categorySchema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:32,
            unique:true
        },

        subcategory:
        {type:Array,
           default:[] 
        }
    },
    {timestamps:true}
);

// Modelling and exporting categorySchema
module.exports=mongoose.model("Category",categorySchema);