const express = require( "express");
const userControllers = require ("../controllers/userController");

const router = express.Router();

router.get ("/main/register",userControllers.getRegister);
router.post ("/main/register",userControllers.registerUser);


module.exports= router;