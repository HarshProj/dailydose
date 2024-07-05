const mongoose=require("mongoose");
const Post = require("./Post");
const {Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    likes:[{
        type:ObjectId,
        ref:Post
    }],
    post:[{
        type:ObjectId,
        ref:Post
    }],
    date:{
        type:Date,
        require:Date.now
    }
})
const User=mongoose.model('user',UserSchema);
module.exports=User;