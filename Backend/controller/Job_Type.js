const AllJobs = require('../schema/All_jobs');
async function jobtype (req,res){
    try{
        const type = req.body;
        if (type.TypeofJob=='FullTime'){
           const data = await AllJobs.find()
           .where('TypeofJob')
           .equals('FullTime')
           return res.status(200).json({
            'msg':data
           })
        // console.log(data);
        }
        else if (type.TypeofJob=='Internship'){
            const data = await AllJobs.find()
            .where('TypeofJob')
            .equals('Internship')
            return res.status(200).json({
                'msg':data
            })
        }
        else{
            return res.status(400).json({
                'msg':'Invalid job type'
            })
        }
        
    }
    catch(err){
        return res.json({
            'msg':err
        })
    }
}
module.exports = {
    jobtype
}