const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();


router.get ("/",mainControllers.getHome);
router.get ("/login",mainControllers.getLogin);
router.get ("/register",mainControllers.getRegister);

router.get ("/carrito",mainControllers.getCarrito);
router.get ("/producto-crear",mainControllers.getCrear); 
router.get ("/detailsproduct",mainControllers.getDetailProduct); /*listado de productos para usuario final*/
router.get ("/editar-productos",mainControllers.getEditar); /*misma vista pero con opcion de seleccionar el producto para editar*/
router.get ("/ventana-editar",mainControllers.getVentana); /*formulario de edicion de un producto*/
router.get ("/error404"); /*pagina de error*/

router.get ("/administracion",mainControllers.getAdmin); /*pagina de administracion con los crud*/
router.get ("/productList",mainControllers.getProductList) /*listado de productos para usuario administrador*/
router.get ("/eliminar-producto",mainControllers.getEliminar); /*pagina de eliminacion de productos*/

router.get ("/producto-crear", mainControllers.getCrear);
router.get("/detalle",mainControllers.getDetalle);
router.get ("/users",mainControllers.getUsers);








module.exports= router;