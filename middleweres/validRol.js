const {  response } = require('express')

const isAdminRol = (req, res = response, next) => {
    if(!req.userAuth){
        return res.status(500).json({
            msg: 'Server error, Se quiere validar el rol, si validar el token'
        })
    }

    const { rol, name } = req.userAuth;

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `El usuario ${name} no esta autorizado para realizar está acción`
        })
    }
    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {
        console.log(roles);
        if(!req.userAuth){
            return res.status(500).json({
                msg: 'Server error, Se quiere validar el rol, si validar el token'
            })
        }
        if(!roles.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg: `Se requiere unos de estos roles ${roles} para ralizar esta acción`
            })
        }

        next();
    }

}

module.exports = {
    isAdminRol,
    hasRole
}