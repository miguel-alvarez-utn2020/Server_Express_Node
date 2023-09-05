const { validationResult } = require("express-validator");

// en los middleweres personalizado, a parte de la req y la res, vamos a tener el parametro next
//
const fieldValid = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){//pregunta si hay errores
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    fieldValid
}