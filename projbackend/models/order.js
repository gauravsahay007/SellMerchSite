const mongoose=require("mongoose");

// by default mongoose adds an _id property to the schemas
// destructuring that id
const {objectId}=mongoose.Schema


//schema for a item in the cart
const itemSchema=new mongoose.Schema(
    {
        name:String,
        price:Number,
        count:Number,
        product:{
            type:objectId,
            //referencing product schema  which contains product name,price, description,photo etc. So every property of product schema can be used with the item
            ref: "Product"
        }

    }
)
// Modelling item schema
const item=mongoose.model("Item",itemSchema);

//schema for order status
const OrderSchema=new mongoose.Schema(
    {
        items: [itemSchema],
        transaction_id: {},
        amount: {type: Number},
        address: String,
        status: {
            type: String,
            default: "Recieved",
            // an enum contains list of possible values
            enum: ["Cancelled","Delivered","Shipped","Processing","Recieved"]
        }
       
    },{timestamps:true}
)

// Modelling OrderSchema
const order=mongoose.model("Order",orderSchema);

// Exporting OrderSchema and ItemSchema
module.exports={Item,Order};