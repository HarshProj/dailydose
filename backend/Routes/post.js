const express=require('express');
const Post = require('../Models/Post');
const fetchuser = require('../middleware/fetchuser');
const User = require('../Models/User');
const router=express.Router();
router.post('/createpost',fetchuser,async(req,res)=>{
    const id=req.user;
    const {description}=req.body;
    if(!description){ 
       return  res.send({msg:"Enter description",success:false});
    }
    const us=await User.findById(id);
    if(!us){
        return res.send({msg:"User Not found",success:false});
        
    }
    const {name}=us;
    console.log(name);
    const post=await Post.create({
        description,
        userid:id,
        likes:[],
        username:name
    })
    post.save()
    .then(async()=>{ 
        // const us=await 
        const user=await User.updateOne({_id:id},{$push:{post:post._id}})
        res.status(200).send({msg:"Post saved successfully",success:true})

    })
    .catch((err)=>{
        res.send({msg:err,success:false})
    })
})
router.delete("/deletepost/:id",fetchuser,async(req,res)=>{
    const postid=req.params.id;
    const {id}=req.user;
    if(!id){
        res.send(500).send("id Not found")
    }
    try {
        const post=await Post.findOne({_id:postid});
        if(!post){
            res.send("Already deleted");
            return ;
        }
        const data=await User.updateOne({_id:id},{$pull:{post:postid}})
        await Post.deleteOne({_id:postid}); 
        res.send(data);
    } catch (error) {
        res.send(error)
    }
})
router.post('/like/:id',fetchuser,async(req,res)=>{
    const {id}=req.params;
    if(!id){
        res.send("Invalid post")
    }
    try {  
        const userid=req.user;
        // console.log(userid);
        const likes=await Post.updateOne({_id:id},{$addToSet: {likes: userid}})
        if(!likes.modifiedCount){
            res.status(200).send({liked:false});
            return ;
        }
        res.send({liked:true});
        console.log("Liked");
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/getposts',async(req,res)=>{
    try {
        const data = await Post.find();
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
})
module.exports=router