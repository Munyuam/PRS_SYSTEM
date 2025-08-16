const express = require('express');
const route = require('./routes/route')
require('dotenv').config();
const port = process.env.PORT
const app = express();

app.use('/',route);

app.listen(port, ()=>{
    console.log('server is running on port',port);
})




