
require('dotenv').config()

// DB CONNECTIONS
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
mongoose.set('strictQuery', true);
// Parsers 

// npm module bodyparser is an npm module used to process data sent in an HTTP request body without this the request data will not be read
// It provides four Express Middlewares for parsing JSON, Text, URL-encoded and raw data sent over HTTP request body
// before target controller receives an incoming request, these middlewares routines handls it
// It allows to access req.body from within routes and use the data
app.use(bodyParser.json());


// Cookie parser used to get cookie data
// to get cookie data use req.cookie prooperty
// req.cookies Object is sent by the request inJSON after parsing
app.use(cookieParser());
app.use(cors());

// My Routes
const authRoutes = require("./routes/auth");
const categoryRoutes=require("./routes/category");
const userRoutes=require("./routes/user");
const productRoutes=require("./routes/product");
// my routes
app.use("/api", authRoutes);
app.use("/api",categoryRoutes);
app.use("/api",userRoutes);
app.use("/api",productRoutes);
mongoose.connect(process.env.DATABASE,{   
}).then(()=>{   
    console.log("DB Connected")
})

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`app is running at port ${port}`)

})




