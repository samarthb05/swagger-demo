const mongoose = require("mongoose");

const bookschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    booktype:{
        type:String,
        enum:['adventure','autobiography','comic'],
        required:true,
    }

});

const bookModel = mongoose.model("book",bookschema);
module.exports = bookModel;