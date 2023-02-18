const mongoose = require('mongoose');



const categorySchema = mongoose.Schema({
    category: String,
    
});



const category = mongoose.model("category", categorySchema)
module.exports = category;
