const express = require( "express");
const userControllers = require ("../controllers/userController");
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/images/avatares");
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname);
    }
});

const uploadFile = multer ({storage});


router.get ("/register", userControllers.register); /* Formulario de Registro*/
router.post ("/register", uploadFile.single ("photo"), userControllers.processRegister); /*Crear usuarios y cargarlos al json*/

router.post ("/login",userControllers.processLogin);/*Login*/
router.get("/password:id",userControllers.processEditPassword);  /*Formulario de cambio de contraseña*/
router.post("/password",userControllers.editPassword); /*modifica la contraseña*/

router.get("/profile/:id",userControllers.profileView); /*Muestra el perfil del usuario*/
router.get ("/usersEdit/:idUser", userControllers.userEdit); /*la vista del formulario de edicion de un usuarios*/ 
router.post ("/usersEdit", uploadFile.single ("photo"), userControllers.processUserEdit); /*Hace los cambios en el formulario de edicion de un usuarios*/ 
router.post ("/usersDelete/:id",userControllers.userDelete); /*Eliminar usuarios*/

router.post("/:id",userControllers.logout); /*desde algun boton aplica la funcionalidad de desloguearse*/

module.exports= router;