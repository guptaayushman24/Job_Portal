const All_Jobs = require('../schema/All_jobs');
async function alljobsdata(req,res){
    try{
        const data = await All_Jobs.find();
        if (data.length==0){
            return res.status(201).json({'msg':'No jobs found'})
        }
        return res.status(200).json({'Job_Data':data});
        
    }
    catch(err){
        return res.status(500).json({'msg':'Something is up with the server'});
    }
}
module.exports = {
    alljobsdata
}