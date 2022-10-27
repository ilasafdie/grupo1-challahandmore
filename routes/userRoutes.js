const express = require( "express");
const userControllers = require ("../controllers/userController");
const multer = require('multer');
const path = require('path');
const router = express.Router();

/* router.get ("/main/register",userControllers.getRegister); */
/* router.post ("/main/register",userControllers.registerUser); */

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/images/avatares");
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname);
    }
});

const uploadFile = multer ({storage});

router.post ("/register", uploadFile.single ("photo"), userControllers.processRegister); /*Crear usuarios y cargarlos al listado final*/
router.get ("/register", userControllers.register);
router.post ("/login",userControllers.processLogin);
router.get ("/usersEdit/:idUser", userControllers.userEdit); /*la vista del formulario de edicion de un usuarios*/ 
router.post ("/usersEdit", uploadFile.single ("photo"), userControllers.processUserEdit); /*Hace los cambios en el formulario de edicion de un usuarios*/ 
router.post ("/usersDelete/:id",userControllers.userDelete); /*Eliminar productos*/
router.get("/profile/:id",userControllers.profileView) /*Perfil del usuario*/
router.post("/password",userControllers.editPassword)
router.get("/password:id",userControllers.processEditPassword)
router.post("/:id",userControllers.logout)

module.exports= router;