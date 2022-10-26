const express = require ( "express");
const router = express.Router();
const multer = require ( "multer");
const prodControllers = require ("../controllers/productControllers");


router.post ("/productCreatePost", prodControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/productCreate", prodControllers.getCreate);
router.get ("/productList/:search?", prodControllers.getProductList); /*listado de productos*/
router.get ("/productEdit/:idProduct", prodControllers.getEdit); /*formulario de edicion de un producto*/ 
<<<<<<< HEAD
router.post ("/productEdit", prodControllers.postEdit); /*Procesamienteo de formularios de creacion de productos*/
router.post ("/productDelete/",prodControllers.postDelete); /*Eliminar productos*/
=======
router.post ("/productEdit", prodControllers.postEdit);
router.post ("/productDelete",prodControllers.postDelete); /*Eliminar productos*/
>>>>>>> 2f1f1df7914799357952c55d307fa036fb38d949
router.get("/productDetail/:id", prodControllers.getDetail); /*Detalles del producto*/

router.post("/productCreate/:id", uploadFile.single("photo"),productControllers.create);


module.exports= router; 