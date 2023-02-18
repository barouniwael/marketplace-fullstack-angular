const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
firstName:String,
lastName:String,
email:{ type: String, index: true, unique: true, required: true },
pwd:String,
phone :{type:Number,index: true, unique: true, required: true },
adress:String,
isAdmin:Boolean,
});


userSchema.plugin(uniqueValidator);
const user = mongoose.model("user", userSchema)
module.exports = user;
