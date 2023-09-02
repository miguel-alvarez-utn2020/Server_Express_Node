const { Router } = require('express')
const { getUser, putUser, postUser, deleteUser, patchUser } = require('../controllers/user')
const router = Router();

//ejemplo de get
router.get('/', getUser )
//ejemplo de put
//cuando queremos recibir un id, despues de la /, ponemos : y el nombre que le queramos dar, en este caso (id)
router.put('/:id', putUser)
//ejemplo de post
router.post('/', postUser)
//ejemplo de delete
router.delete('/', deleteUser)
//ejemplo de patch
router.patch('/', patchUser)

module.exports = router;