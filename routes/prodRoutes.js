const express = require ( "express");
const router = express.Router();
const multer = require ( "multer");
const prodControllers = require ("../controllers/productControllers");


router.post ("/productCreatePost", prodControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/productCreate", prodControllers.getCreate);
router.get ("/productList/:search?", prodControllers.getProductList); /*listado de productos*/
router.get ("/productEdit/:idProduct", prodControllers.getEdit); /*formulario de edicion de un producto*/ 
router.post ("/productEdit", prodControllers.postEdit); /*Procesamienteo de formularios de creacion de productos*/
router.post ("/productDelete/",prodControllers.postDelete); /*Eliminar productos*/
router.get("/productDetail/:id", prodControllers.getDetail); /*Detalles del producto*/

router.post("/productCreate/:id", uploadFile.single("photo"),productControllers.create);


module.exports= router; 