const express = require ( "express");
const mainControllers = require ("../controllers/mainControllers");
const router = express.Router();

const path = require("path");
const multer = require("multer");

router.get ("/", mainControllers.getHome);
router.get ("/error404"), mainControllers.getError; /*pagina de error*/
router.get ("/shopping", mainControllers.getShopping);

router.get("/kosher", mainControllers.getKosher);

/*router.get('/', function(req, res){
    const usuario = req.cookies.nombre;
    res.send ('Bienvenido usuario: ' usuario);
})

router.get('/register/:name', function(req, res){
    let nombre = 'nombre' , nombre);
    res.send ('cooookies')
}) */


module.exports= router;