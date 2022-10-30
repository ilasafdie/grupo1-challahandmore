const express = require ( "express");
const prodControllers = require ("../controllers/productControllers");
const multer = require('multer');
const path = require('path');
const router = express.Router();
const uploadFile = require ('../middlewares/multerProducts')

router.post ("/productCreatePost", uploadFile.single ("photo"), prodControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/productCreate", prodControllers.getCreate);
router.get ("/productList/:search?", prodControllers.getProductList); /*listado de productos*/
router.get ("/productEdit/:idProduct", prodControllers.getEdit); /*formulario de edicion de un producto*/ 
router.post ("/productEdit",uploadFile.single ("photo"), prodControllers.postEdit);
router.post ("/productDelete/:idProduct",prodControllers.postDelete); /*Eliminar productos*/
router.get("/productDetail/:id", prodControllers.getDetail); /*Detalles del producto*/



module.exports= router;