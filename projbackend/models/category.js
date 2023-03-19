const mongoose=require("mongoose");
const categorySchema=new mongoose.Schema(
    {
        name:{
            type:string,
            trim:true,
            required:true,
            maxlength:32,
            unique:true,
            ref:"Category"
        }
    },
    {timestamps:true}
);
module.exports=mongoose.model("Category",categorySchema);