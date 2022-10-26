const express = require( "express");
const userControllers = require ("../controllers/userController");

const router = express.Router();

/* router.get ("/main/register",userControllers.getRegister); */
/* router.post ("/main/register",userControllers.registerUser); */


router.post ("/usersCreatePost", userControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/usersCreate", userControllers.getCreate);
router.get ("/usersList/:search?", userControllers.getUserList); /*listado de productos*/
router.get ("/usersEdit/:idUser", userControllers.getEdit); /*formulario de edicion de un producto*/ 
router.post ("/usersEdit", userControllers.postEdit);
router.post ("/usersDelete/",userControllers.postDelete); /*Eliminar productos*/
router.get("/usersDetail/:id", userControllers.getDetail); /*Detalles del producto*/


module.exports= router;