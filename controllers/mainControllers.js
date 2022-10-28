const fs = require('fs');
const path = require('path');


const mainController = {

    /*METODOS CENTRALES */

    getHome: function (req, res) {
        res.render("home")
       // res.cookies.nombre = "dana"
    },

    getError: function (req, res) {
        res.render("error")
    },

    getShopping: function (req, res) {
        res.render("shopping")
    },

    getKosher: function (req, res) {
        res.render("kosher")
    },
   
}




module.exports = mainController;