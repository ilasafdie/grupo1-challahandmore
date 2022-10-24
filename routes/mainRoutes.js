const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();


router.get ("/", mainControllers.getHome);
router.get ("/login", mainControllers.getLogin);
router.get ("/register", mainControllers.getRegister);
router.get ("/error404"), mainControllers.getError; /*pagina de error*/
router.get ("/shopping", mainControllers.getShopping);

router.post ("/productCreatePost", mainControllers.postCreate); /*Crear productos y cargarlos al listado final*/
router.get ("/productCreate", mainControllers.getCreate);
router.get ("/productList/:search?", mainControllers.getProductList); /*listado de productos*/
router.get ("/productEdit/:idProduct", mainControllers.getEdit); /*formulario de edicion de un producto*/ 
router.post ("/productEdit", mainControllers.postEdit);

/* router.delete ("/productDelete/:idProduct",mainControllers.getDelete); /*Eliminar productos*/

router.get("/productDetail/:id", mainControllers.getDetail); /*Detalles del producto*/

router.get ("/users", mainControllers.getUsers);



module.exports= router;