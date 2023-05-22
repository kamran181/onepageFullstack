const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName : {
        type : String ,
        required: true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

},{timestamps : true});

module.exports = mongoose.model('Employee' , employeeSchema);