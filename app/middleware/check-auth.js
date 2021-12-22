const env = require('../config/env.js');
const jwt=require('jsonwebtoken');


const chkToken = (req, res, next) => {
    try
    {
        //const token=req.headers.authorization.split(" ")[1];
        const token = req.headers['vs-auth-token'];
        const decoded_token = jwt.verify(token,env.password_token);
        //console.log(decoded_token);
        res.token_user = decoded_token;
        next();
    }
    catch(error)
    {
        res.status(401).json({msg:"Token authentication failed"});
    }
};

module.exports = chkToken;