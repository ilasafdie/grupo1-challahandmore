const fs = require('fs');
const path = require('path');


const mainController = {

    /*METODOS CENTRALES */

    getHome: function (req, res) {
        res.render("home",  {userLogged: req.session.userLogged})
    },

    getError: function (req, res) {
        res.render("error",  {userLogged: req.session.userLogged})
    },

    getShopping: function (req, res) {
        res.render("shopping",  {userLogged: req.session.userLogged})
    },

    getKosher: function (req, res) {
        res.render("kosher",  {userLogged: req.session.userLogged})
    },
   
    getAbout: function (req, res) {
        res.render("about",  {userLogged: req.session.userLogged})
    },
}




module.exports = mainController;