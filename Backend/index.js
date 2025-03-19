const express = require('express');
const {databaseconnection} = require('./db');
const  route  = require('./routes/routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

const PORT = 5000;
databaseconnection();
app.use('/',route);
app.listen(PORT,()=>{
    console.log(`PORT is running on ${PORT}`);
})


