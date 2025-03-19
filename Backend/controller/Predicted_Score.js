const {PythonShell} = require('python-shell')
const fs = require('fs');
function Predict_Score (req,res){
    try{
        PythonShell.run('D:/Cap_Stone/Backend/controller/NewVoicetotext.py').then(messages=>{
            const extractedText = messages[messages.length- 1];
            return res.json({
                'msg':extractedText
            })
        })
       

    }
    catch(err){
        return res.json({
            'msg':err
        })
    }
}

async function Capture_button_response(req,res){
    try{
        const response = req.body;
        return res.json({
            'msg':response
        })
    }   
    catch(err){
        return res.josn({
            'msg':err
        })
    }
}

module.exports = {
    Predict_Score,
    Capture_button_response
}

