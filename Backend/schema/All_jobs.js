const mongoose = require('mongoose');
const All_Jobs_Schema = new mongoose.Schema({
    CompanyName:{
        type:String,
        require:true
    },
    JobTitle:{
        type:String,
        require:true
    },
    JobDescription:{
        type:String,
        require:true,
    },
    SkillsRequired:{
        type:String,
        
        require:true
    },
    Salary:{
        type:Number,
        require:true
    },
    Loacation:{
        type:String,
        require:true
    },
    TypeofJob:{
        type:String,
        require:true
    }
},{collection: 'All_Jobs'})
const All_Jobs = mongoose.model('All_Jobs',All_Jobs_Schema);
module.exports = All_Jobs;