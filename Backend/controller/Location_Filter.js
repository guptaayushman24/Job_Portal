const AllJobs = require('../schema/All_jobs');
async function locationfilter (req,res){
    try{
        const location = req.body;
        if (location.Location=='Noida'){
        const data = await AllJobs.find()
        .where('Location')
        .equals('Noida')
        return res.status(200).json({
            'msg':data
        })
        }
        else if (location.Location=='Bangalore'){
            const data = await AllJobs.find()
            .where('Location')
            .equals('Bangalore')
            return res.status(200).json({
                'msg':data
            })
        }
        else if (location.Location=='Gurgaon'){
            const data = await AllJobs.find()
            .where('Location')
            .equals('Gurgaon')
            return res.status(200).json({
                'msg':data
            })
        }
        else if (location.Location=='Hyderabad'){
            const data = await AllJobs.find()
            .where('Location')
            .equals('Hyderabad')
            return res.status(200).json({
                'msg':data
            })
        }
        else if (location.Location=='Pune'){
            const data = await AllJobs.find()
            .where('Location')
            .equals('Pune')
            return res.status(200).json({
                'msg':data
            })
        }
        else{
            return res.status(400).json({
                'msg':'Invalid Location'
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
    locationfilter
}