const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 255
  }
},{timestamps:true});

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;