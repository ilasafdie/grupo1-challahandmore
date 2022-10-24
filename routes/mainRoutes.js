const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");
const router = express.Router();


router.get ("/", mainControllers.getHome);
router.get ("/login", mainControllers.getLogin);
router.get ("/register", mainControllers.getRegister);
router.get ("/error404"), mainControllers.getError; /*pagina de error*/
router.get ("/shopping", mainControllers.getShopping);


module.exports= router;