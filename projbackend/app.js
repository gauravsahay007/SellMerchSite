
require('dotenv').config()

// DB CONNECTIONS
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Parsers 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
const authRoutes = require("./routes/auth");


// my routes
app.use("/api", authRoutes);

mongoose.connect(process.env.DATABASE,{
}).then(()=>{
    console.log("DB Connected")
})

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`app is running at port ${port}`)

})




