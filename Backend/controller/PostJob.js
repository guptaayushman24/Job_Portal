const All_Jobs = require('../schema/All_jobs');
async function postjob(req,res){
    try{
        const body = req.body;
        await All_Jobs(body).save();
        return res.status(200).json({
            'msg':body
        })
    }
    catch(err){
        return res.json({
            'message':err
        })
    }
}
module.exports = {
    postjob
}