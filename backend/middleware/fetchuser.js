const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(500).send({error:'Access denied token not found'})
    }
    try {
        
    } catch (error) {
        res.send(error);
    }
}
module.exports=verifyuser;