const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String, //tipo de dato del nombre
        required: [true, 'El nombre es obligatorio'],//si es requerido y posible mensaje de error
    },
    email: {
        type: String, //tipo de dato del nombre
        required: [true, 'El email es obligatorio'],//si es requerido y posible mensaje de error
        unique: true,//con esto mongo no me permite ingrasar con email repetidos
    },
    password: {
        type: String, //tipo de dato del nombre
        required: [true, 'El password es obligatorio'],//si es requerido y posible mensaje de error
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
})
//exportamos nombre del modelo, el cual es en singular, mongo despues se encarga de hacerlo plural,(users)
//y el schame
module.exports = model( 'User',  UserSchema )