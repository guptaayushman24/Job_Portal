const multer = require('multer')
const upload = multer({dest:'uplodads/'})
async function Response (req,res){
    try{
        return res.status(200).json({
            'msg':req.file
        })
    }
    catch(err){
        return res.status(500).json({
            'Internal Server Error':err
        })
    }
}
module.exports = {
    Response
}