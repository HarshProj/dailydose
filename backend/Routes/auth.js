const express=require('express');
const router=express.Router();
const JWT_SECRET="HELLODEAR" 
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const {body,validationResult}=require('express-validator');
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:3}),

],async(req,res)=>{
    // const user=await new User(req.body);
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

router.get('/login',[
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
            user:user.id
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
module.exports=router;