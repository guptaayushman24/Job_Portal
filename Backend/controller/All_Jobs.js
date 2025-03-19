const All_Jobs = require('../schema/All_jobs');
const jwt = require('jsonwebtoken')
const JWT_SECRET = "akldnfknkr@123464"
async function alljobsdata(req,res){
    try{
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({
                'message':'You are not looged in !'
            })
        }
        const decoded = jwt.verify(token,JWT_SECRET);
        if (decoded.id){
            const data = await All_Jobs.find();
            if (data.length==0){
                return res.status(201).json({
                    'msg':'No jobs found'
                })
            }
            else{
                return res.status(200).json({
                    'Job_Data':data
                })
            }
            return res.status(200).json({
                'msg':'No jobs found'
            })
        }
        // res.send({
        //     useremail:decoded.id
        // })
        // const data = await All_Jobs.find();
        // if (data.length==0){
        //     return res.status(201).json({'msg':'No jobs found'})
        // }
        // return res.status(200).json({'Job_Data':data});

       
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({'msg':'Something is up with the server'});
    }
}
module.exports = {
    alljobsdata
}