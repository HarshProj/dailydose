const express=require('express');
const router=express.Router();
const JWT_SECRET="HELLODEAR" 
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {body,validationResult}=require('express-validator');
const User = require('../Models/User');
const fetchuser = require('../middleware/fetchuser');
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:3}),

],async(req,res)=>{
    // const user=await new User(req.body);
    const ip = req.headers['cf-connecting-ip'] ||
                req.headers['x-real-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress || '' ;
    // console.log(req,body);
    const valid=validationResult(req);
    if(!valid.isEmpty()){
       return  res.status(400).send({"error":"enter valid Credentials"})
    }
    try {
        
        var user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"Sorry we already have an user with this email"})
        }
        
         var salt=await bcrypt.genSaltSync(10);
         const secpass= await bcrypt.hash(req.body.password,salt);
         user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secpass,
        })
        const data={
            user:{
                id:user.id,
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        return res.send({"auth-token":authtoken});
        // const errors=validationResult(req);
    } catch (error) {
        console.log("Some error");
        res.status(500).send("Some error occured");
    }
})

router.post('/login',[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:3}),

],async(req,res)=>{
    // const user=await new User(req.body);
    const valid=validationResult(req);
    if(!valid.isEmpty()){
       return  res.status(400).send({"error":"enter valid Credentials"})
    }
    try {
        const {email,password}=req.body;
        var user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({error:"Please try with correct credentials"})
        }

        var passwordcompare=await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(400).send({error:"Please enter correct credentials"});
        }
        const data={
            user:{
            id:user.id} 
        }
        // console.log(user);
        const authtoken=jwt.sign(data,JWT_SECRET);
        return res.send({"auth-token":authtoken});
        // const errors=validationResult(req);
    } catch (error) {
        console.log("Some error"); 
        res.status(500).send("Some error occured");
    } 
})
router.get('/getuser',fetchuser,async(req,res)=>{
    console.log(req.user);
    const data=await User.findOne({_id:req.user.id});
    if(!data){
        return res.send({info:"user does not exists"})
    }
    console.log(data);
    return res.status(200).json(data);
})
router.get('/getuser/:id',fetchuser,async(req,res)=>{
    const {id}=req.params;
    const info=await User.findOne({_id:id}); 
    if(!info){
        return res.send({inf:"user does not exists"})
    }
    
    console.log(info);
    if(id!=req.user.id)
    return res.status(200).send({info,diff:true,ui:req.user});

    return res.status(200).json({info,diff:false});
    
})
router.post('/updateuser',fetchuser,async(req,res)=>{
    try {
        const {work}=req.body;
        const user=await User.updateOne({_id:req.user},{work});
        if(!user){
            res.send({msg:"erorr"})
        }
        res.send({msg:true});
        
    } catch (error) {
        res.send(error)
    }
})
module.exports=router;