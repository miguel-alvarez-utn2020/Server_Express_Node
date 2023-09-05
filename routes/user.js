const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValid } = require('../middleweres/field-validation')
const { getUsers, putUser, postUser, deleteUser, patchUser } = require('../controllers/user')
const { isValidRole, isEmail, isValidId } = require('../helpers/db-validators')
const router = Router();

//ejemplo de get
router.get('/', getUsers )
//ejemplo de put
//cuando queremos recibir un id, despues de la /, ponemos : y el nombre que le queramos dar, en este caso (id)
router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isValidId ),
    fieldValid
] , putUser)
//ejemplo de post
router.post('/', [
    check('email').custom( isEmail ),//tiene que ser un email
    check('name', 'El nombre es obligatori').not().isEmpty(),//el campo no tiene que estar vacio el campo del nombre
    check('password', 'El password es obligatorio').not().isEmpty().isLength({ min: 6 }),//el campo no tiene que estar vacio el campo del nombre
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('rol').custom( (rol) => isValidRole(rol) ), esto se puede hacer asi, pero como solo recibe un argumento
    //no es necesario indicarlo, solo con pasar la referencia de la funcion ya se le pasara el argumento
    check('rol').custom( isValidRole ),
    fieldValid
],postUser)
//ejemplo de delete
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( isValidId ),
    fieldValid
],deleteUser)
//ejemplo de patch
router.patch('/', patchUser)

module.exports = router;