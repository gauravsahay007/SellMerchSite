
require('dotenv').config()

// DB CONNECTIONS
const mongoose = require("mongoose");
const express = require("express");
const app = express();
mongoose.connect(process.env.DATABASE,{
}).then(()=>{
    console.log("DB Connected")
})

const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`app is running at port ${port}`)

})




