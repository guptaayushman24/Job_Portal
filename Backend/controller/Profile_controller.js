const Profile = require('../schema/Profile_Schema');
async function userprofile (req,res){
    try{
        const data = req.body;
        await Profile(data).save();
        return res.status(201).json({
            'msg':data
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            'err':err
        })
    }
    
}
async function getprofileskill(req,res){
  try{
    const email = req.body;
    // Use 'findOne' to search for the document by Email
    const result = await Profile.findOne({ Email: email.Email });
    if (!result) {
        // Handle the case when no matching document is found
        return res.status(404).json({
            msg: 'Profile not found',
        });
    }

    // Return only the 'Skills' field from the document
    return res.status(200).json({
        Skills: result.Skills, // Access the Skills field safely
    });
}
  catch(err){
    console.log(err);
    if (res.status===400){
        return res.json({
            'msg':'400 Bad Request'
        })
    }
    return res.status(404).json({
        'msg':'Something went wrong result is not fetched'
    })
  }
}
module.exports = {
    userprofile,
    getprofileskill
}