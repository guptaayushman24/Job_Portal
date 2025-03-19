const config = require('../env_file')
const jwt = require('jsonwebtoken');
const UserSchema = require('../schema/User_Schema');
const JWT_SECRET = config.env;
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
    if (userenterdpassword === password.Password) {
        const token = jwt.sign({ id: email }, JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true, 
            secure: false,  
            sameSite: "Lax"
        });
        return res.json({
            message: "Logged in",
            msg: "User Found"
        });
    }
}
async function logout(req,res){
    res.cookie("token", "", {
        httpOnly: true, 
        secure: false,  
        sameSite: "Lax"
    });
     return res.json({
        "message":"logout"
     })
    
}
module.exports = {
    signup,
    signin,
    logout
}