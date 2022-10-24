const fs = require('fs');
const path = require('path');


const mainController = {

    /*METODOS CENTRALES */

    getHome: function (req, res) {
        res.render("home")
    },

    getLogin: function (req, res) {
        res.render("login")
    },

    getRegister: function (req, res) {
        res.render("register")
    },

    getError: function (req, res) {
        res.render("error")
    },

    getShopping: function (req, res) {
        res.render("shopping")
    },
   
}




module.exports = mainController;