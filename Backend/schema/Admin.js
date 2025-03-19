const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:true,
    },
    Email:{
     type:String,
     require:true
    },
    Password:{
        type:String,
        require:true
    }
})
const Admin = mongoose.model('Admin',AdminSchema);
module.exports = Admin;