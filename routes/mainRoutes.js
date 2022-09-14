const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();


router.get ("/",mainControllers.getHome);
router.get ("/carrito",mainControllers.getCarrito);
router.get ("/login",mainControllers.getLogin);
router.get ("/register",mainControllers.getRegister);
router.get ("/product",mainControllers.getDetailProduct);
router.get ("/users",mainControllers.getUsers);


module.exports= router;