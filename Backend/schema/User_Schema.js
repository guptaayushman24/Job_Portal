const mongoose = require('mongoose');
const User_Schema = new mongoose.Schema({
    FirstName:{
        type:String,
        require:true
    },
    LastName:{
        type:String,
        require:true
    },
    EmailAddress:{
        type:String,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true
    }
})
const UserSchema = mongoose.model('UserSchema',User_Schema);
module.exports = UserSchema;