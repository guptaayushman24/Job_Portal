const mongoose = require('mongoose');
connectionURL = 'mongodb://localhost:27017/Job'
async function databaseconnection(){
   try{
    await mongoose.connect(connectionURL);
    console.log("Mongodb Connected");
   }
   catch(err){
    console.log(err);
   
}
}
module.exports={
    databaseconnection
}
