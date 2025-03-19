// const multer = require('multer')
// const upload = multer({dest:'uplodads/'})
// async function Response (req,res){
//     try{
//         return res.status(200).json({
//             'msg':req.file
//         })
//     }
//     catch(err){
//         return res.status(500).json({
//             'Internal Server Error':err
//         })
//     }
// }
// module.exports = {
//     Response
// }


const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload directory
const uploadDir = 'controller/mp3files';  // Backend\mp3files  // Backend\controller\mp3files

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // Ensure this path exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
    }
});

const upload = multer({ storage: storage });

async function Response(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        return res.status(200).json({
            message: "File uploaded successfully",
            filename: req.file.filename,
            path: req.file.path
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            details: err.message
        });
    }
}

module.exports = {
    Response,
    upload
};
