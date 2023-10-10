const  fieldValid = require('../middleweres/field-validation')
const  validRol  = require('../middleweres/validRol')
const  validateJWT = require('../middleweres/validate-jwt')

module.exports = {
    ...fieldValid,
    ...validRol,
    ...validateJWT
}