const mongoose=require('mongoose');
const uri="mongodb+srv://hharshchauhan1:uKQtGm59pr1vcd3R@dailydose.klnieoi.mongodb.net/?retryWrites=true&w=majority&appName=dailydose"
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