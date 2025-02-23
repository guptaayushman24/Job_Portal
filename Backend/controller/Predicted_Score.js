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
        // const filesTodelete = [
        //     'D:/Cap_Stone/Backend/upload/91fe20042225a54ba05c08a512e6cada',
        //     'D:/Cap_Stone/Backend/controller/mp3files/audio.mp3',
        //     'D:/Cap_Stone/Backend/controller/Response/Response.txt'
        // ]
        // filesTodelete.forEach(filePath=>{
        //     fs.unlink(filePath,err=>{
        //         if (err){
        //             console.error(`Error deleting file ${filePath}: ${err}`);
        //         }
        //         else{
        //             console.log(`File ${filePath} deleted successfully`);
        //         }
        //     })
        // })

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

