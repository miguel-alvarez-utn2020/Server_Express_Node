const { response, request } = require('express')
const User  = require('../models/user')

const jwt = require('jsonwebtoken')

const validateJWT = async (req = request, res = response, next)=> {
    const  token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No token valid'
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userAuth =  await User.findById(uid);

        if(!userAuth){
            return res.status(401).json({
                msg:'Token no válido o user no existe...'
            })
        }

        if(!userAuth.status){
            return res.status(401).json({
                msg:'Token no válido o user eliminado...'
            })
        }

        req.userAuth = userAuth;


        next();
    }catch(err){
        console.error(err);
        return res.status(401).json({
            msg: 'No token valid'
        });
    }
}

module.exports = {
    validateJWT
}