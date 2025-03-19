const express = require('express');
const router = express.Router();
const multer = require('multer')
const {alljobsdata} = require('../controller/All_Jobs');
const {signup,signin,logout} = require('../controller/Authentication');
const {userprofile,getprofileskill} = require('../controller/Profile_controller')
const {checkcredential,checkcredentialsignin,checkprofilecredential} = require('../Middleware/middleware')
const {checkscore} = require('../controller/nlp_model')
const {salaryfilter} = require('../controller/Salary_Filter')
const {locationfilter} = require('../controller/Location_Filter')
const {jobtype} = require('../controller/Job_Type')
const {upload,Response} = require('../controller/Response')
const {Predict_Score,Capture_button_response} = require('../controller/Predicted_Score');
const { adminsignup,adminsignin } = require('../controller/Admin');
const { postjob } = require('../controller/PostJob');
router.get('/alljobs',alljobsdata);
router.post('/signup',checkcredential,signup);
router.post('/signin',checkcredentialsignin,signin);
router.post('/logout',logout);
router.post('/userprofile',checkprofilecredential,userprofile);
router.post('/userskills',getprofileskill);
router.post('/check_similarity',checkscore);
router.get('/salaryfilter',salaryfilter);
router.post('/locationfilter',locationfilter);
router.post('/jobtype',jobtype)
router.post('/uploadmp3file',upload.single('file'),Response)
router.get('/runpythoncode',Predict_Score);
router.post('/capturebuttonresponse',Capture_button_response)
router.post('/adminsignup',adminsignup)
router.post('/adminsignin',adminsignin);
router.post('/postjob',postjob)
module.exports = router