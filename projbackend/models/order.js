const mongoose=require("mongoose");

// by default mongoose adds an _id property to the schemas
// destructuring that id
const {ObjectId}=mongoose.Schema


//schema for a item in the cart
const ProductCartSchema =new mongoose.Schema({
    product:{
        type : ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

//schema for order status
const OrderSchema=new mongoose.Schema(
    {
        items: [ProductCartSchema],
        transaction_id: {},
        amount: {type: Number},
        address: String,
        status: {
            type: String,
            default: "Recieved",
            // an enum contains list of possible values
            enum: ["Cancelled","Delivered","Shipped","Processing","Recieved"]
        },
        updated: Date,
        user:{
            type: ObjectId,
            ref:"User"
        }
       
    },{timestamps:true}
)

// Modelling OrderSchema
const Order=mongoose.model("Order",OrderSchema);


// Exporting OrderSchema and ItemSchema
module.exports={ProductCart,Order};