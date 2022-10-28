const path = require('path');
const { body } = require('express-validator');

//este modulo es un controller de validaciones de usuarios (no borrar)
//body permite validar los campos de un formulario

const validacionesUsers = {
    
    //chequeado por Malka
    register: [

        body('username')
            .notEmpty().withMessage('Username is required'),
        body('email')
            .notEmpty().withMessage('An email is required').bail()
            .isEmail().withMessage('This email is invalid'),
        body('password')
            .notEmpty().withMessage('Password is required').bail()
            .isLength({ min: 8 }).withMessage('Password should be minimum 8 characters legth'),
        body('passwordConfirm').notEmpty().withMessage('Please write your password again'),
    ],

    //desde aca falta chequear
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


module.exports = validacionesUsers;