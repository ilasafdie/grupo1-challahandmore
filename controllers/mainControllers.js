const controller = {
    
    getHome: function(req, res){
        res.render("home") },

    getLogin: function(req, res){
        res.render ("login") },

    getRegister: function (req, res){
        res.render ("register") },

    getCarrito: function(req, res){
        res.render ("carrito") },

    getDetailProduct: function(req, res){
        res.render ("detailsProduct") },

    getUsers: function(req, res){
            res.render ("users") }

    }
    


module.exports = controller;