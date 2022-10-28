const path = require('path');
const { body } = require('express-validator');

const validationsUsers = {
    
    register: [
        body('password')
            .isLength({ min: 8 }).withMessage('Password should be minimum 8 characters legth'),
    ],

    login: [
        body('email')
            .notEmpty().withMessage('El email usuario es necesario').bail()
            .isEmail().withMessage('Esto no es un email'),
        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .isLength({ min: 8 }).withMessage('necesitas minimo 8 caracteres'),
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