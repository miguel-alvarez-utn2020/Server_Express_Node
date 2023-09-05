const Role = require('../models/role')
const User = require('../models/user')


const isValidRole = async (rol = '')=> {
    //busca en la base de datos si exite el role que viene por parametro
    const rolExist = await Role.findOne({rol});
    if(!rolExist){
        throw new Error('NO EXISTE ESE ROL');
    }
} 
const  isEmail = async ( email = '')=> {
    //busca en la base de datos si hay uno con este email
    const rolExist = await Role.findOne({email});
    if (rolExist) {
        throw new Error(`El email ${email}, ya fue registrado...`);
    }
}

const isValidId = async ( id = '')=> {
    //busca por ID en la base de datos si existe user con este id
    const isValidId = await User.findById(id);
    if( !isValidId ){
        throw new Error(`El id ${id}, no existe...`);
    }
}



module.exports = {
    isValidRole,
    isEmail,
    isValidId
}