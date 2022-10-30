const express = require( "express");
const userControllers = require ("../controllers/userController");
const path = require('path');
const router = express.Router();
const { body } = require ('express-validator');
const validationsUsers = require("../middlewares/validationsUsers");

router.get ("/register", userControllers.register); /* Formulario de Registro*/
router.post ("/register", validationsUsers.register ,userControllers.processRegister); /*Crear usuarios y cargarlos al json*/

router.get ("/login",userControllers.login) /*muestra el form de login*/
router.post ("/login",userControllers.processLogin);/*procesa y valida el login*/
router.post("/changePassword",userControllers.changePassword); /*modifica la contraseña*/

router.get("/profile",userControllers.profileView); /*Muestra el perfil del usuario y permite editarlo*/
router.post ("/profile", userControllers.processUserEdit); /*Hace los cambios en el formulario de edicion de un usuarios*/ 
router.post ("/userDelete",userControllers.userDelete); /*Eliminar el perfil propio*/

router.get("/logout",userControllers.logout); /*desde algun boton aplica la funcionalidad de desloguearse*/

module.exports= router;