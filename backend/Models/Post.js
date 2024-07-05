const mongoose=require("mongoose")
const {Schema}=mongoose;
const PostSchema=new Schema({
    description:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        require:true,
    },
    likes:{
        type:Number,
        
    },
    date:{
        type:Date,
        require:Date.now
    }
})
const Post=mongoose.model('post',PostSchema);
module.exports=Post;