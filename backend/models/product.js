const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
    category: String,
    name: String,
    price: Number,
    time: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status: String,
    img:String,
});



const product = mongoose.model("product", productSchema)
module.exports = product;
