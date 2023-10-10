const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { fieldValid } = require('../middleweres/field-validation');
const { validateJWT } = require('../middleweres/validate-jwt');


const router = Router();

//ejemplo de get
router.post('/login', [
    
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldValid
],login);

module.exports = router;