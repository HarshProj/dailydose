const mongoose=require('mongoose');
const uri="mongodb://localhost:27017/DailyDose"
const connecttodb=()=>{
    mongoose.connect(uri)
    .then(()=>{
        console.log("Connected to db")
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports=connecttodb;