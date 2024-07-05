const express=require('express');
const Post = require('../Models/Post');
const router=express.Router();

router.get('/createpost',async(rq,res)=>{
    const token=req.header('auth-token');
    if(!token){
        res.send("Invalid token is absent")
    }
    const {description}=req.body;

    if(!description){
        res.send("Enter description");
    }
    const post=await Post.create({
        description
    })
})
module.exports=router