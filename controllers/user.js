const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  //para obtener params opcionales, como: user?nombre=miguel, lo que esta despues del ? es un parametro opcional
  //estos a diferencia del los id, no viene en params, sino en query.
  //con la desestructuración extraigo lo que a mi me interesa de lo que el cliente me esta mandando.
  const { limit = 5, from = 0 } = req.query;
  const query = {status: true}
  //skip: desde que numero de usuario empezar a cargar
  //limit: cuantos quiero cargar
  //puedo pasarle a find un filtro del tipo de usuario que quiero cargar

  //estos dos await se puede reemplazar por la lines de código 18
  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const usersCount = await User.countDocuments(query)
  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit))
  ]);

  res.json({
    count,
    users
  });
};

const putUser = async (req, res) => {
  //para recibir un id que viene en la req, tenemos que acceder a los params.
  const { id } = req.params; // el .id esta relacionado con el nombre que nosotros le dimos en la ruta.
  const { _id, password, google, email, ...rest } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.json({
    user,
  });
};

const postUser = async (req, res = response) => {
  const { name, password, rol, email } = req.body;
  const user = new User({ name, password, rol, email });
  //encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  // Guarda en BaseDB

  await user.save();
  res.json({
    user,
  });
};

const deleteUser = async (req, res) => {

  const { id } = req.params;
  const userAuth = req.userAuth;
  //delete físico de la base de datos(no re comendad)
  // const user = await User.findByIdAndDelete(id);

  //delete logico dela base de datos
  const user = await User.findByIdAndUpdate(id, {status: false});
  if(!user.status){
    return res.status(401).json({
      msg: 'El usuario no existe o ya a sido eliminado...'
    })
  }

  res.json({
    user,
    userAuth
  });
};

const patchUser = (req, res) => { 
  res.json({
    name: "miguel",
    id: 3,
    metod: "patch",
  });
};

module.exports = {
  getUsers,
  putUser,
  postUser,
  deleteUser,
  patchUser,
};
