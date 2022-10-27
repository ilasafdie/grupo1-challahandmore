const path = require('path');
const { body } = require('express-validator');

const validacionesProducts = [
    body('name').notEmpty().withMessage('El nombre de la actividad es obligatorio'),
    body('price').notEmpty().withMessage('El precio es obligatorio'),
    body('category').notEmpty().withMessage('Debes elegir una categoria'),
    body('morningShift').notEmpty().withMessage('Elige un horario de mañana'),
    body('afternoonShift').notEmpty().withMessage('Elige un horario de tarde'),
    body('nightShift').notEmpty().withMessage('Elige un horario de noche'),
    body('description').notEmpty().withMessage('Debes agregar una descripción'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let extensionesPermitidas = ['.png', '.jpg'];
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            let extension = path.extname(file.originalname);
            if(!extensionesPermitidas.includes(extension)){
                throw new Error(`Las extenciones permitidas son: ${extensionesPermitidas}`);
            }
        }
        return true;
    })
];

module.exports = validacionesProducts;