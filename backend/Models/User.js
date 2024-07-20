const mongoose=require("mongoose");
const Post = require("./Post");
const {Schema}=mongoose;
const {ObjectId}=Schema.Types
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
    image:{
        type:String
    },
    work:{
        type:String
    },
    password:{
        type:String,
        require:true,
    },
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