const express = require( "express");
const userControllers = require ("../controllers/userControllers");

const router = express.Router();

router.get ("/main/register",userControllers.getRegister);



module.exports= router;