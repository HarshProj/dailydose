const jwt=require('jsonwebtoken');
const JWT_SECRET="HELLODEAR" 
const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(500).send({error:'Access denied token not found'})
    }
    try {   
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(501).send(error);
    }
}
module.exports=fetchuser;