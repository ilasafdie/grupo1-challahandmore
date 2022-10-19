const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();


router.get ("/",mainControllers.getHome);
router.get ("/login",mainControllers.getLogin);
router.get ("/register",mainControllers.getRegister);
router.get ("/error404"), mainControllers.getError; /*pagina de error*/
router.get ("/carrito",mainControllers.getCarrito);

router.post ("/producto-crear",mainControllers.postCrear); /*Crear productos y cargarlos al listado final*/
router.get ("/productList/:search?",mainControllers.getProductList) /*listado de productos*/
router.get ("/product-edit/:idProduct",mainControllers.getEditar); /*formulario de edicion de un producto*/ 
router.put ("/product-edit",mainControllers.putEditar);

router.delete ("/eliminar-producto/:idProduct",mainControllers.getEliminar); /*Eliminar productos*/

router.get ("/administracion",mainControllers.getAdmin); /*pagina de administracion con los crud*/
router.get("/detalle/:id",mainControllers.getDetalle); /*Detalles del producto*/

router.get ("/users",mainControllers.getUsers);



module.exports= router;