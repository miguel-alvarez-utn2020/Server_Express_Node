const { response, request } = require("express");
const User = require('../models/user');
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res, next) => {

    const { password, email} = req.body;

    try{
        //vereficar si el email existe
        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                msg: 'EL user o el password incorrecto'
            })
        }
        //si el usuario está activo
        if(!user.status){
            return res.status(400).json({
                msg: 'EL user o el password incorrecto'
            })
        }

        //varificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'EL user o el password incorrecto'
            })
        }
        //generar un jwt
        const token = await generateJWT(  user.id );


        res.json({
            user,
            token
        })

    }
    catch(err) {
        res.status(500).json({
            msg: 'Server error'
        })
    }

    
}

module.exports = {
    login
}