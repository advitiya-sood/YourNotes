const jwt = require('jsonwebtoken');

const secretKey="I_am_Batman";  

const fetchUser=(req,res,next)=>{
// get the id from the JWT token from sent by the loggedin user.


try{

    const token= req.header('auth-token');
    if (!token){
        res.status(401).send({error:"Invalid token"})
    }
    const data=jwt.verify(token,secretKey);     // data retrived from the JWT token after validation of the token
    req.user=data.user;
    next();
}catch(error){
    res.status(401).send({error:"Invalid token"})
}

}


module.exports= fetchUser;