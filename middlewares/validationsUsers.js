const path = require('path');
const { body } = require('express-validator');

const validationsUsers = {
    
    register: [
        body('password')
            .isLength({ min: 8 }).withMessage('The password should be minimum 8 characters length'),
    ],

    editPassword: [
        body('passwordOld')
            .notEmpty().withMessage('La contraseña actual es obligatoria').bail()
            .isLength({ min: 8 }).withMessage('necesitas minimo 8 caracteres'),
        body('password')
            .notEmpty().withMessage('La nueva contraseña es obligatoria').bail()
            .isLength({ min: 8 }).withMessage('necesitas minimo 8 caracteres'),
        body('passwordConfirm').notEmpty().withMessage('Debes confirmar tu nueva contraseña'),
    ]
}


module.exports = validationsUsers;