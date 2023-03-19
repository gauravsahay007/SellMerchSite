const mongoose=require("mongoose");
const {objectId}=mongoose.Schema
//schema for a item in the cart
const itemSchema=new mongoose.Schema(
    {
        name:String,
        price:Number,
        count:Number,
        product:{
            type:objectId,
            ref: "Product"
        }

    }
)
//schema for order status
const orderSchema=new mongoose.Schema(
    {
       
    }
)
const item=mongoose.model("Item",itemSchema);
const order=mongoose.model("Order",orderSchema);
module.exports={Item,Order};