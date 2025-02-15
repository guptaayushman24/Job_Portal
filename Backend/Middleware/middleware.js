const {z} = require('zod');
const emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordregex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
function checkcredential (req,res,next){
    
    if (!(req.body.FirstName)){
        return res.json({
            'msg':'First Name is required'
        })
    }
    if (!(req.body.LastName)){
        return res.json({
            'msg':'Last Name is required'
        })
    }
    if (!(req.body.EmailAddress)){
        return res.json({
            'msg':'Please enter the email address'
        })
    }
    if (!(req.body.Password)){
        return res.json({
            'msg':'Please enter the Passsword'
        })
    }
    if (!emailregex.test(req.body.EmailAddress)){
        return res.json({
            'msg':'Enter the valid email address'
        })
    }
    if (!passwordregex.test(req.body.Password)){
        return res.json({
            'msg':'Enter the strong password'
        })
    }
    
    next();

}
function checkcredentialsignin(req,res,next){
    if (!(req.body.EmailAddress)){
        return res.json({
            'msg':'Please enter the email address'
        })
    }
    if (!(req.body.Password)){
        return res.json({
            'msg':'Please enter the Passsword'
        })
    }
    if (!emailregex.test(req.body.EmailAddress)){
        return res.json({
            'msg':'Enter the valid email address'
        })
    }
    if (!passwordregex.test(req.body.Password)){
        return res.json({
            'msg':'Enter the strong password'
        })
    }
    next();
}

function checkprofilecredential(req,res,next){
    if (!req.body.Email){
        return res.json({
            'msg':'Please enter the email address'
        })
    }
    if (!emailregex.test(req.body.Email)){
        return res.json({
            'msg':'Enter the valid email address'
        })
    }
    if (req.body.Skills.length==0){
        return res.json({
            'msg':'Atleast one skill is required'
        })
    }
    next();
}
module.exports = {
    checkcredential,
    checkcredentialsignin,
    checkprofilecredential
}