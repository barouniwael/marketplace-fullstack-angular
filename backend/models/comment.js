
const mongoose = require('mongoose');
const Product = require('./product');



const commentSchema = mongoose.Schema({
   
    user: String,
    subject:String,
    body:String,
    productId:{
       type:  mongoose.Schema.Types.ObjectId,
       ref:"Product",
    }

});
const comment = mongoose.model("comment", commentSchema)
module.exports = comment;