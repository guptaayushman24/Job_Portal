const AdminSchema = require('../schema/Admin');
async function adminsignup (req,res){
    try{
        const data = req.body;
        await AdminSchema(data).save();
        return res.status(201).json({
            'Admin':data
        })
    }
    catch(err){
        if (err.code===11000){
            return res.json({
                'Duplicate':'Email address exist please do the signin'
            })
        }
        return res.status(404).json({
            'error':'Something is wrong happend'
        })
    }
}

async function adminsignin(req,res){
    try{
        const body = req.body;
        const data = await AdminSchema.findOne({
            Email:body.Email
        })
        if (!data){
            return res.json({
                'msg':'Please do the signup'
            })
           
        }
        
        const password = data.Password;
        if (password!=body.Password){
            return res.json({
                'msg':'Please check the password'
            })
        }
        return res.json({
            'msg':'User Found'
        })
    }
    catch(err){
        return res.status(400).json({
            'error':'Somwthing is wrong there'
        })
    }
}
module.exports = {
    adminsignup,
    adminsignin
}