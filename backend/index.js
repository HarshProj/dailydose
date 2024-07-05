const express=require('express')
const app=express();
const connect=require('./db');
connect();
app.use(express.json())
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/post',require('./Routes/post'));
app.get('/',(req,res)=>{
    res.send("Home")
})
app.listen(5000,()=>{
console.log("Listening at port",5000);
})