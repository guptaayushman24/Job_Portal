const UserSchema = require('../schema/User_Schema');
async function signup (req,res){
    try{
        const data = req.body;
        await UserSchema(data).save();
        return res.status(201).json({
            'UserData':data
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
async function signin (req,res){
    const email = req.body.EmailAddress;
    const userenterdpassword = req.body.Password;
    const password = await UserSchema.findOne({EmailAddress:email});
    if (password==null){
        return res.json({
            'msg':"Please check the email address"
        })
    }
    if (userenterdpassword===password.Password){
        return res.json({
            'msg':'User Found'
        })
    }
        return res.json({
            'msg':'Please check your password'
        })
}
module.exports = {
    signup,
    signin,
}