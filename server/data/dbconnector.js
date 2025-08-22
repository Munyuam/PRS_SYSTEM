const {createPool} = require('mysql2')
require('dotenv').config();

const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 10,
    queueLimit: 0
}) 

pool.query('SELECT * FROM Departments',(err, result)=>{
    if(result){
    console.log(result)
    }else{
        console.log(err.message)
    }
});


module.exports = pool;