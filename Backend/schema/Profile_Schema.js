const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    Email:{
     type:String,
     require:true
    },
    Skills:{
       type:[String],
       require:true
    },
    JobType:{
        type:String,
        require:true
    },
    PreferedLocation:{
     type:String,
     
     require:true
    }
})
const Profile = mongoose.model('Profile',ProfileSchema);
module.exports = Profile;


