const express = require( "express");
const mainControllers = require ("../controllers/mainControllers");

const router = express.Router();

router.get ("/",mainControllers.getIndex);
router.get ("/",mainControllers.getHome);
router.get ("/",mainControllers.getCarrito);
router.get ("/",mainControllers.getLogin);
router.get ("/",mainControllers.getRegister);
router.get ("/",mainControllers.getDetailProduct);
router.get ("/",mainControllers.getUsers);


module.exports= router;