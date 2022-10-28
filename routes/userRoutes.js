const express = require( "express");
const userControllers = require ("../controllers/userController");
const path = require('path');
const router = express.Router();

router.get ("/register", userControllers.register); /* Formulario de Registro*/
router.post ("/register", userControllers.processRegister); /*Crear usuarios y cargarlos al json*/

router.get ("/login",userControllers.login) /*muestra el form de login*/
router.post ("/login",userControllers.processLogin);/*procesa y valida el login*/
router.get("/password:id",userControllers.processEditPassword);  /*Formulario de cambio de contraseña*/
router.post("/password",userControllers.editPassword); /*modifica la contraseña*/

router.get("/profile/:id",userControllers.profileView); /*Muestra el perfil del usuario*/
router.get ("/usersEdit/:idUser", userControllers.userEdit); /*la vista del formulario de edicion de un usuarios*/ 
router.post ("/usersEdit", userControllers.processUserEdit); /*Hace los cambios en el formulario de edicion de un usuarios*/ 
router.post ("/usersDelete/:id",userControllers.userDelete); /*Eliminar usuarios*/

router.post("/logout:id",userControllers.logout); /*desde algun boton aplica la funcionalidad de desloguearse*/

module.exports= router;