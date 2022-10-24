const express = require ( "express");
const prodControllers = require ("../controllers/productControllers");
const router = express.Router();

router.post ("/productCreatePost", prodControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/productCreate", prodControllers.getCreate);
router.get ("/productList/:search?", prodControllers.getProductList); /*listado de productos*/
router.get ("/productEdit/:idProduct", prodControllers.getEdit); /*formulario de edicion de un producto*/ 
router.post ("/productEdit", prodControllers.postEdit);

/* router.delete ("/productDelete/:idProduct",prodControllers.getDelete); /*Eliminar productos*/

router.get("/productDetail/:id", prodControllers.getDetail); /*Detalles del producto*/


module.exports= router;