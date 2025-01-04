require('dotenv').config()
const express=require('express')
const app=express(); 
const cors = require('cors');
app.use(cors());

const connect=require('./db');
connect(); 
const port=process.env.PORT||5000;
app.use(express.json())
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/post',require('./Routes/post'));
app.get('/',(req,res)=>{
    res.send("Home")
})  
app.listen(port,()=>{
console.log("Listening at port",port);
})
