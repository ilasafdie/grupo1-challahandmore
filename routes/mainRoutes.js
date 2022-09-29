const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();


router.get ("/",mainControllers.getHome);
router.get ("/carrito",mainControllers.getCarrito);
router.get ("/login",mainControllers.getLogin);
router.get ("/register",mainControllers.getRegister);
router.get ("/detailsproduct",mainControllers.getDetailProduct);
router.get ("/users",mainControllers.getUsers);
router.get ("/editar-productos",mainControllers.getEditar);
router.get ("/producto-crear",mainControllers.getCrear);
router.get ("/ventana-editar",mainControllers.getVentana);





module.exports= router;