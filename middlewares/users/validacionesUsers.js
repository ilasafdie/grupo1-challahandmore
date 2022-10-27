const path = require('path');
const { body } = require('express-validator');

const validacionesUsers = {
    register: [

        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('nombre').custom(value=>value != "admin").withMessage('Elige otro nombre'),
        body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
        body('genero').notEmpty().withMessage('Indicanos tu genero'),
        body('edad').notEmpty().withMessage('Debés indicar tu edad'),
        body('actividad').notEmpty().withMessage('Debés elegir tu actividad favorita'),
        body('email')
            .notEmpty().withMessage('El email usuario es necesario').bail()
            .isEmail().withMessage('Esto no es un email'),
        body('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .isLength({ min: 8 }).withMessage('necesitas minimo 8 caracteres'),
        body('passwordConfirm').notEmpty().withMessage('Debes confirmar tu contraseña'),
        body('condiciones').notEmpty().withMessage('Debes aceptar terminos y condiciones'),
        body('fotoPerfil').custom((value, { req }) => {
            let file = req.file;
            let extensionesPermitidas = ['.png', '.jpg'];
            if (!file) {
                throw new Error('Tienes que subir una foto');
            } else {
                let extension = path.extname(file.originalname);
                if (!extensionesPermitidas.includes(extension)) {
                    throw new Error(`Las extensiones permitidas son: ${extensionesPermitidas.join(', ')}`);
                }
            }
            return true;
        })
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


module.exports = validacionesUsers;