require('dotenv').config()
const mongoose=require('mongoose');
const uri=process.env.mongo_uri
const connecttodb=()=>{
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    .then(()=>{
        console.log("Connected to db")
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports=connecttodb;