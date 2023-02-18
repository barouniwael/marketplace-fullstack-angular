const mongoose= require("mongoose");


const messageSchema = mongoose.Schema({
 message : String,
 senderId : {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 targetId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
 },
 productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
 }
})

const message= mongoose.model("message", messageSchema);
module.exports = message