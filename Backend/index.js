const express = require('express');
const {databaseconnection} = require('./db');
const  route  = require('./routes/routes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
databaseconnection();
app.use('/',route);
app.listen(PORT,()=>{
    console.log(`PORT is running on ${PORT}`);
})
