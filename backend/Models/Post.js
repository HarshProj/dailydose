const mongoose=require("mongoose");
const User = require("./User");
const {Schema}=mongoose;
const {ObjectId}=Schema.Types;
const PostSchema=new Schema({
    description:{
        type:String,
        require:true
    },
    userid:{
        type:ObjectId,
        ref:'User',
        require:true
    },
    likes:[{
        type:ObjectId,
        ref:User,
    }],
    date:{
        type:Date,
        require:Date.now
    }
})
const Post=mongoose.model('post',PostSchema);
module.exports=Post;