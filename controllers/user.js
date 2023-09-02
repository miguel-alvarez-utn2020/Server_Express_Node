const { response, request } = require('express')


const getUser = (req = request, res = response) => {
    //para obtener params opcionales, como: user?nombre=miguel, lo que esta despues del ? es un parametro opcional
    //estos a diferencia del los id, no viene en params, sino en query.
    //con la desestructuración extraigo lo que a mi me interesa de lo que el cliente me esta mandando.
    const { nombre, pass } = req.query;
    res.json({
        name: 'miguel',
        id: 3,
        metod: 'get controller',
        nombre,
        pass
    })
}

const putUser = (req, res) => {
    //para recibir un id que viene en la req, tenemos que acceder a los params.
    const { id } = req.params; // el .id esta relacionado con el nombre que nosotros le dimos en la ruta.
    res.json({
        name: 'miguel',
        id,
        metod: 'put controller',
    })
}

const postUser = (req, res = response) => {
   const { nombre, edad } = req.body;
    res.json({  
        nombre,
        edad
    })
}

const deleteUser = (req, res) => {
    res.json({
        name: 'miguel',
        id: 3,
        metod: 'delete controller'
    })
}

const patchUser = (req, res) => {
    res.json({
        name: 'miguel',
        id: 3,
        metod: 'patch'
    })
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser,
    patchUser
}